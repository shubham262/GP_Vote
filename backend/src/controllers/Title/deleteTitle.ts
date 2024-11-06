import { Response } from 'express';
import { UserEntity } from '../../entities';
import { errorHandlerWrapper } from '../../utils';
import { titleService } from '../../services';
import httpStatus from 'http-status';

const deleteTitleHandler = async (req, res: Response): Promise<void> => {
	const { id } = req.query;
	const user: UserEntity = req.user;
	const titles = await titleService.deleteTitle(id, user.uuid);
	res.json(titles).status(httpStatus.OK);
};

export const deleteTitleController = errorHandlerWrapper(deleteTitleHandler);
