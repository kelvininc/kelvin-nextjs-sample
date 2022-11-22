/* eslint-disable @typescript-eslint/no-explicit-any */
import bytes from 'bytes';
import { Duration } from 'luxon';
import ms from 'ms';

const booleanFalseValues = ['false', '0', 'no', 'off'];

export class Env {
	static getString(key: string): string {
		return process.env[key] || '';
	}
	static getNumber(key: string): number {
		const value = Env.getString(key);
		if (value) {
			return +value;
		}
		return 0;
	}
	static getBoolean(key: string): boolean {
		const value = Env.getString(key);
		if (!value) {
			return false;
		}
		if (booleanFalseValues.includes(value)) {
			return false;
		}
		return true;
	}
	static getDuration(key: string): Duration {
		const value = Env.getString(key);
		if (!value) {
			return Duration.fromMillis(0);
		}
		const millis = ms(value);
		return Duration.fromMillis(millis);
	}
	static getBytes(key: string): number {
		const value = Env.getString(key);
		if (!value) {
			return 0;
		}
		return bytes(value);
	}
}

export const inBrowser = (): boolean => typeof window !== 'undefined';
export const inServer = (): boolean => typeof window === 'undefined';
export const inDevMode = (): boolean => Env.getString('NODE_ENV') === 'development';
