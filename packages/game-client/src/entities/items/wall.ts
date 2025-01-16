import { RawEntity } from "@shared/types/entity";
import { AssetManager } from "../../managers/asset";
import { GameState } from "../../state";
import { Renderable } from "../util";
import { ClientEntity } from "../../entities/client-entity";
import { ClientPositionable } from "../../extensions";
import { Z_INDEX } from "@shared/map";
export class WallClient extends ClientEntity implements Renderable {
  constructor(data: RawEntity, assetManager: AssetManager) {
    super(data, assetManager);
  }

  public getZIndex(): number {
    return Z_INDEX.BUILDINGS;
  }

  render(ctx: CanvasRenderingContext2D, gameState: GameState): void {
    super.render(ctx, gameState);

    const positionable = this.getExt(ClientPositionable);
    const position = positionable.getPosition();
    const image = this.imageLoader.get("wall");
    ctx.drawImage(image, position.x, position.y);
  }
}
