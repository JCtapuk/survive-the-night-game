import { Entities, Entity } from "../entities";
import { Vector2 } from "../physics";
import { Harvestable, Positionable } from "../traits";

export class Tree extends Entity implements Harvestable, Positionable {
  private isHarvested = false;
  private position: Vector2 = { x: 0, y: 0 };

  constructor(id: string) {
    super(Entities.TREE, id);
  }

  harvest(): void {
    this.isHarvested = true;
  }

  getIsHarvested(): boolean {
    return this.isHarvested;
  }

  getPosition(): Vector2 {
    return this.position;
  }

  setPosition(position: Vector2) {
    this.position = position;
  }

  getCenterPosition(): Vector2 {
    return this.position;
  }
}
