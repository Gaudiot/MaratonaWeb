import ICreateMedalDTO from '../../dtos/ICreateMedalDTO';
import IUpdateMedalDTO from '../../dtos/IUpdateMedalDTO';
import MedalType from '../../entities/enums/MedalType.enum';
import Medal from '../../entities/Medal';

interface IMedalRepository {
	create(medalData: ICreateMedalDTO): Promise<Medal>;
	count(): Promise<number>;
	countByMedalType(medalType: MedalType): Promise<number>;
	retrieveAll(): Promise<Medal[]>;
	findById(id: string): Promise<Medal | undefined>;
	updateById(medalData: IUpdateMedalDTO): Promise<Medal | undefined>;
	deleteById(id: string): void;
}

export default IMedalRepository;