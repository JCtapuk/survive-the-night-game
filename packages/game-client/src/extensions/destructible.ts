import { ExtensionTypes } from "../../../game-shared/src/util/extension-types";
import { ClientExtensionSerialized } from "@/extensions/types";
import { BaseClientExtension } from "./base-extension";

export class ClientDestructible extends BaseClientExtension {
  public static readonly type = ExtensionTypes.DESTRUCTIBLE;

  private health = 0;
  private maxHealth = 0;

  public getHealth(): number {
    return this.health;
  }

  public getMaxHealth(): number {
    return this.maxHealth;
  }

  public isDead(): boolean {
    return this.health === 0;
  }

  public deserialize(data: ClientExtensionSerialized): this {
    this.health = data.health;
    this.maxHealth = data.maxHealth;
    return this;
  }
}
