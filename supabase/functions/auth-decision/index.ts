// supabase/functions/auth-decision/index.ts
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'

// Hardcodeamos la URL de Supabase (es pública)
const supabaseUrl = 'https://ailxagjsbvnlqilfxuvp.supabase.co'
// Leemos la clave service_role desde una variable de entorno llamada SERVICE_ROLE_KEY
const supabaseServiceRoleKey = Deno.env.get('SERVICE_ROLE_KEY') ?? ''

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': '*',
}

serve(async (req) => {
  // Manejar preflight CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const url = new URL(req.url)
  const token = url.searchParams.get('token')
  const decision = url.searchParams.get('decision')

  if (!token || !decision) {
    return new Response('Faltan parámetros', { status: 400, headers: corsHeaders })
  }

  console.log(`Token: ${token}, Decisión: ${decision}`)

  try {
    // Verificar que la clave esté configurada
    if (!supabaseServiceRoleKey) {
      console.error('Falta la variable SERVICE_ROLE_KEY en los secrets de la función')
      return new Response('Error de configuración del servidor', { status: 500, headers: corsHeaders })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

    // Buscar el token en la tabla admin_auth_requests
    const { data: existing, error: findError } = await supabase
      .from('admin_auth_requests')
      .select('id, status')
      .eq('token', token)
      .maybeSingle()

    if (findError) {
      console.error('Error al buscar token:', findError)
      return new Response(JSON.stringify({ error: findError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (!existing) {
      console.error('Token no encontrado:', token)
      return new Response('Token inválido o expirado', { status: 404, headers: corsHeaders })
    }

    if (existing.status !== 'pending') {
      console.error(`Token ya procesado (estado: ${existing.status})`)
      return new Response(`Esta solicitud ya fue ${existing.status === 'approved' ? 'aprobada' : 'rechazada'}`, {
        status: 400,
        headers: corsHeaders,
      })
    }

    // Actualizar estado
    const newStatus = decision === 'approve' ? 'approved' : 'rejected'
    const { error: updateError } = await supabase
      .from('admin_auth_requests')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', existing.id)

    if (updateError) {
      console.error('Error al actualizar:', updateError)
      return new Response(JSON.stringify({ error: updateError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    console.log(`Token ${token} actualizado a ${newStatus}`)

    // Página HTML de éxito/error
    const emoji = decision === 'approve' ? '🍮✨' : '🔒'
    const title = decision === 'approve' ? '¡Acceso concedido!' : 'Acceso rechazado'
    const msg = decision === 'approve'
      ? 'La solicitud fue aprobada. El modo admin ya está activo en la página.'
      : 'La solicitud fue rechazada. El acceso no fue concedido.'
    const color = decision === 'approve' ? '#f9c76e' : '#ff5f8f'

    const html = `<!doctype html>
<html>
<head><meta charset="utf-8" /><title>Sammy Room — Verificación Admin</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #fff8e7; font-family: 'Press Start 2P', monospace; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
  .card { border: 4px solid #6b4f3a; background: #fffde8; box-shadow: 6px 6px 0 #6b4f3a; padding: 2rem; max-width: 420px; width: 90%; text-align: center; }
  .emoji { font-size: 3rem; margin-bottom: 1rem; display: block; }
  h1 { font-size: 0.75rem; color: ${color}; text-shadow: 2px 2px 0 #6b4f3a; margin-bottom: 1rem; }
  p { font-size: 0.55rem; color: #6b4f3a; line-height: 1.8; }
  .btn { display: inline-block; margin-top: 1.5rem; border: 3px solid #6b4f3a; background: ${color}; padding: 0.5rem 1rem; font-family: inherit; font-size: 0.55rem; cursor: pointer; text-decoration: none; color: #6b4f3a; }
  .btn:hover { background: #6b4f3a; color: #fff8e7; }
</style>
</head>
<body>
<div class="card">
  <span class="emoji">${emoji}</span>
  <h1>${title}</h1>
  <p>${msg}</p>
  <a href="javascript:window.close()" class="btn">cerrar ventana</a>
</div>
</body>
</html>`

    return new Response(html, {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' },
    })
  } catch (err) {
    console.error('Error inesperado:', err)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})