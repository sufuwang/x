import { type CookieOptions as TCookieOptions } from 'express';

export const CookieOptions: TCookieOptions = {
  httpOnly: true, // 禁止 JS 访问，防 XSS
  secure: process.env.NODE_ENV === 'prod', // 仅 HTTPS 传输
  sameSite: 'none', // 允许防止跨站请求
  maxAge: 24 * 60 * 60 * 1000, // 24h
  domain: process.env.NODE_ENV === 'prod' ? '.sufu.site' : '', // 可选：允许子域名共享
  path: '/', // 可选：作用路径
};
