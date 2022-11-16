import ICreateMedalDTO from '../../dtos/ICreateMedalDTO';
import IUpdateMedalDTO from '../../dtos/IUpdateMedalDTO';
import Medal from '../../entities/Medal';

interface IMedalRepository {
	create(medalData: ICreateMedalDTO): Promise<Medal>;
	retrieveAll(): Promise<Medal[]>;
	findById(id: string): Promise<Medal | undefined>;
	updateById(medalData: IUpdateMedalDTO): Promise<Medal | undefined>;
	deleteById(id: string): void;
}

export default IMedalRepository;