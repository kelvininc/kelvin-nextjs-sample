/* eslint-disable @typescript-eslint/no-var-requires */
const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
	// At the time of writing, reactStrictMode must be false for react-keycloak to work. See https://github.com/react-keycloak/react-keycloak/issues/182
	reactStrictMode: false,
	swcMinify: true,
	experimental: { appDir: true },
	i18n
};

module.exports = nextConfig;
