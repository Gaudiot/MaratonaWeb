import IHashProvider from '../models/IHashProvider';

import { hash, compare } from 'bcrypt';

class BCryptHashProvider implements IHashProvider {
	public async generateHash(payload: string): Promise<string> {
		return hash(payload, 15);
	}

	public async compareHash(payload: string, hashed: string): Promise<boolean> {
		return compare(payload, hashed);
	}
}

export default BCryptHashProvider;