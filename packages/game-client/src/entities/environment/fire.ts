import { ClientPositionable } from "@/extensions";
import { ClientEntityBase } from "@/extensions/client-entity";
import { AssetManager } from "@/managers/asset";
import { GameState } from "@/state";
import { Z_INDEX } from "@server/managers/map-manager";
import { RawEntity } from "@shared/types/entity";
import { Renderable, getFrameIndex } from "../util";

export class FireClient extends ClientEntityBase implements Renderable {
  constructor(data: RawEntity, assetManager: AssetManager) {
    super(data, assetManager);
  }

  public getZIndex(): number {
    return Z_INDEX.ITEMS;
  }

  render(ctx: CanvasRenderingContext2D, gameState: GameState): void {
    const positionable = this.getExt(ClientPositionable);
    const position = positionable.getPosition();
    const frameIndex = getFrameIndex(gameState.startedAt, {
      duration: 500,
      frames: 5,
    });
    const image = this.imageLoader.getFrameIndex("flame", frameIndex);
    ctx.drawImage(image, position.x, position.y);
  }
}
