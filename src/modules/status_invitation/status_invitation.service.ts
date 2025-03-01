import { Injectable, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateStatusInvitationDto } from 'src/modules/status_invitation/dto/create-status-invitation.dto';
import { StatusInvitationEntity } from './entity/status_invitation.entity';

@Injectable()
export class StatusInvitationService {
  constructor(
    @InjectRepository(StatusInvitationEntity)
    private statusInvitationRepository: Repository<StatusInvitationEntity>,
  ) {}

  async findAll(): Promise<StatusInvitationEntity[]> {
    return await this.statusInvitationRepository.find();
  }

  async findOneByEmail(email: string): Promise<StatusInvitationEntity | null> {
    return await this.statusInvitationRepository.findOne({ where: { email } });
  }

  async createInviation(invitation: CreateStatusInvitationDto): Promise<any> {
    const data = {
      ...invitation,
      created_at: new Date(),
    };

    const statusInvitation = this.statusInvitationRepository.create(data);

    await this.statusInvitationRepository.save(statusInvitation);

    return { message: 'Status do Envio Cadastrado com sucesso' };
  }

  async finishingInvite(email: string): Promise<any> {
    const invitation = await this.findOneByEmail(email);

    if (!invitation) {
      throw new HttpException('Convite não encontrado', 404);
    }

    const date = {
      statusId: 1,
      updated_at: new Date(),
    };
    await this.statusInvitationRepository.update(invitation.id, date);
  }
}
