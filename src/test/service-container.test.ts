import { describe, expect, it } from 'vitest';
import { container } from '../services/service-container';

class TestService {
	serviceName: string;
	constructor(name: string) {
		this.serviceName = name;
	}
}

describe('Service container', async () => {
	const testService: TestService = new TestService('test-service');
	container.register('test', testService);
	it('Service must be returned', () => {
		expect(container.resolve<TestService>('test')).toBe(testService);
	});
	it('If service is not registered, it must throw an error', () => {
		expect(() => container.resolve<TestService>('not-registered')).toThrowError();
	});
});
