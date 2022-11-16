import { randomUUID } from 'crypto';
import ICreateMedalDTO from '../dtos/ICreateMedalDTO';
import IUpdateMedalDTO from '../dtos/IUpdateMedalDTO';
import Medal from '../entities/Medal';
import IMedalRepository from './interfaces/IMedalRepository';

class FakeMedalsRepository implements IMedalRepository {
	private medals: Medal[] = [];

	public async create(medalData: ICreateMedalDTO): Promise<Medal> {
		const medal = new Medal();

		Object.assign(medal, {id: randomUUID()}, medalData);

		this.medals.push(medal);

		return medal;
	}

	public async findById(id: string): Promise<Medal | undefined> {
		return this.medals.find((medal) => medal.id === id);
	}

	public async updateById(medalData: IUpdateMedalDTO): Promise<Medal | undefined> {
		const medalIndex = this.medals.findIndex(medal => medal.id === medalData.id);

		if(medalIndex == -1) return;

		const medal = new Medal();

		Object.assign(medal, this.medals[medalIndex], medalData);

		return medal;
	}

	public deleteById(id: string): void {
		const medalIndex = this.medals.findIndex(medal => medal.id === id);

		if(medalIndex != -1){
			this.medals.splice(medalIndex, 1);
		}
	}
}

export default FakeMedalsRepository;