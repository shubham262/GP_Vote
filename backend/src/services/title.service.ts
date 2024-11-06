import { Repository } from 'typeorm';
import { AppDataSouce } from '../db';
import { TitleEntity } from '../entities';
import { CreateTitleType } from '../types';

export const createTitle = async (
	data: CreateTitleType
): Promise<TitleEntity> => {
	const titleRepository = AppDataSouce.getRepository(TitleEntity);
	const newTitle = titleRepository.create(data);
	await titleRepository.save(newTitle);

	return newTitle;
};

export const readTitle = async (uuid: string): Promise<TitleEntity[]> => {
	const titleRepository: Repository<TitleEntity> =
		AppDataSouce.getRepository(TitleEntity);

	return titleRepository.find({
		where: {
			userId: {
				uuid,
			},
		},
	});
};

export const deleteTitle = async (
	titleId: string,
	uuid: string
): Promise<boolean> => {
	const titleRepository: Repository<TitleEntity> =
		AppDataSouce.getRepository(TitleEntity);

	// Perform the delete operation
	const response = await titleRepository.delete({
		uuid: titleId,
		userId: { uuid },
	});

	// Check if a title was actually deleted
	if (response.affected === 0) {
		return false;
	}
	return true;
};
