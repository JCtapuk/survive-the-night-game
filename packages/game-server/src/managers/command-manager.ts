import {
  ADMIN_COMMANDS,
  AdminCommand,
  AdminCommandType,
  CreateEntityCommand,
  CreateItemCommand,
} from "@shared/commands/commands";
import { IEntityManager } from "./types";
import Positionable from "@/shared/extensions/positionable";
import { Vector2 } from "@/shared/physics";
import { EntityType } from "@shared/types/entity";

export class CommandManager {
  private entityManager: IEntityManager;

  private commandMap: Record<AdminCommandType, (payload: AdminCommand["payload"]) => void>;

  constructor(entityManager: IEntityManager) {
    this.entityManager = entityManager;
    this.commandMap = {
      [ADMIN_COMMANDS.CREATE_ITEM]: this.createItem.bind(this),
      [ADMIN_COMMANDS.CREATE_ENTITY]: this.createEntity.bind(this),
    };
  }

  handleCommand(command: AdminCommand) {
    const handler = this.commandMap[command.command];
    if (!handler) return;

    handler(command.payload);
  }

  private createItem(payload: CreateItemCommand["payload"]) {
    const item = this.entityManager.createEntityFromItem({
      key: payload.itemType,
    });
    item.getExt(Positionable).setPosition(payload.position);
    this.entityManager.addEntity(item);
  }

  private createEntity(payload: CreateEntityCommand["payload"]) {
    const entity = this.entityManager.createEntity(payload.entityType);
    entity.getExt(Positionable).setPosition(payload.position);
    this.entityManager.addEntity(entity);
  }
}
