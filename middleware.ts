export { default } from 'next-auth/middleware'
export const config = { matcher: ['/admin/works/create', '/admin/works/update/:path*', '/admin/works/delete/:path*'] }

