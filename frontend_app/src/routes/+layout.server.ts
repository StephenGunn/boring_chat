/*
 * Disable server-side rendering for the application, no need
 * need to make it more complicated than it needs to be.
 *
 * It is very possible to use web-sockets on a SSR application,
 * but you have to be very careful with the way you handle it.
 */

export const ssr = false;
