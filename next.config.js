/* eslint-disable @typescript-eslint/no-var-requires */
const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
	swcMinify: true,
	experimental: { appDir: true, esmExternals: 'loose' },
	i18n
};

module.exports = nextConfig;
