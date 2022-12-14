/* eslint-disable @typescript-eslint/no-explicit-any */
import bytes from 'bytes';
import dayjs from 'dayjs';
import duration, { Duration } from 'dayjs/plugin/duration';
import ms from 'ms';

dayjs.extend(duration);

const booleanFalseValues = ['false', '0', 'no', 'off'];

export class Env {
	static getString(key: string, defaultValue = ''): string {
		return process.env[key] || defaultValue;
	}
	static getNumber(key: string, defaultValue = 0): number {
		const value = Env.getString(key);
		if (value) {
			return +value;
		}
		return defaultValue;
	}
	static getBoolean(key: string, defaultValue = false): boolean {
		const value = Env.getString(key);
		if (!value) {
			return defaultValue;
		}
		if (booleanFalseValues.includes(value)) {
			return false;
		}
		return true;
	}
	static getDuration(key: string, defaultValue = dayjs.duration(0)): Duration {
		const value = Env.getString(key);
		if (!value) {
			return defaultValue;
		}
		const millis = ms(value);
		return dayjs.duration(millis);
	}
	static getBytes(key: string, defaultValue = 0): number {
		const value = Env.getString(key);
		if (!value) {
			return defaultValue;
		}
		return bytes(value);
	}
}

export const inBrowser = (): boolean => typeof window !== 'undefined';
export const inServer = (): boolean => typeof window === 'undefined';
export const inDevMode = (): boolean => Env.getString('NODE_ENV') === 'development';
