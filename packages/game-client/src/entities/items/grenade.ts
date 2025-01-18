import { GameState } from "@/state";
import { Renderable } from "@/entities/util";
import { ClientEntity } from "@/entities/client-entity";
import { ClientPositionable } from "@/extensions";
import { Z_INDEX } from "@shared/map";

export class GrenadeClient extends ClientEntity implements Renderable {
  public getZIndex(): number {
    return Z_INDEX.ITEMS;
  }

  render(ctx: CanvasRenderingContext2D, gameState: GameState): void {
    super.render(ctx, gameState);
    const positionable = this.getExt(ClientPositionable);
    const position = positionable.getPosition();
    const image = this.imageLoader.get("grenade");
    ctx.drawImage(image, position.x, position.y);
  }
}
