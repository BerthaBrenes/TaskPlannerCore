import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendRequestRepository } from './friend.request.repository';
import { RequestDTO } from './dto/friend-request.dto';
import { StatusType } from 'src/data/statusType.enum';
import { StudentRepository } from 'src/students/students.repository';

@Injectable()
export class FriendRequestService {

    constructor(
        @InjectRepository(FriendRequestRepository)
        private requestRepository: FriendRequestRepository,
        @InjectRepository(StudentRepository)
        private stdRepository: StudentRepository,
    ) { }


    async createRequest(data: RequestDTO) {
        return this.requestRepository.createRequest(data);
    }


    async resolveRequest(id: string, status: StatusType) {
        const found = await this.requestRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Request with the id ${id} not found`)
        }
        found.status = status;
        found.save();

        if (status === StatusType.ACCEPTED) {
            const from = await this.stdRepository.findOne(found.from);
            const to = await this.stdRepository.findOne(found.to);
            from.friends.push(to.id);
            to.friends.push(from.id);
            await from.save();
            await to.save();
        }

        return found;
    }

    async getSentRequests(id: string) {
        const found = await this.requestRepository.find({ where: { from: id } });
        if (!found) {
            throw new NotFoundException(`Request with the id ${id} not found`);
        }

        const friendList = [];

        for await (const f of found){
            const from = await (await this.stdRepository.findOne(f.from)).name;
            const to = await (await this.stdRepository.findOne(f.to)).name;
            friendList.push({from: from, to: to, status: f.status});
        }

        return friendList;
    }

    async getReceivedRequests(id: string) {
        const found = await this.requestRepository.find({ where: { to: id } });
        if (!found) {
            throw new NotFoundException(`Request with the id ${id} not found`)
        }
        return found;
    }

}
