class ServiceContainer {
	private services = new Map<string, unknown>();

	register<T>(token: string, service: T): void {
		this.services.set(token, service);
	}

	resolve<T>(token: string): T {
		const service = this.services.get(token);
		if (!service) throw new Error(`Service ${token} not found`);
		return service as T;
	}
}

export const container = new ServiceContainer();
