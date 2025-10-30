import { type CookieOptions as TCookieOptions } from 'express';

export const CookieOptions: TCookieOptions = {
  httpOnly: true, // 禁止 JS 访问，防 XSS
  secure: true, // 仅 HTTPS 传输
  // secure: process.env.NODE_ENV === 'prod', // 仅 HTTPS 传输
  sameSite: 'none', // 允许防止跨站请求
  maxAge: 60 * 60 * 60 * 1000, // 1h
  domain: process.env.NODE_ENV === 'prod' ? '.sufu.site' : 'localhost', // 可选：允许子域名共享
  path: '/', // 可选：作用路径
};
