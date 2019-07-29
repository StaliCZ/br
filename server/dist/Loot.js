"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LootItem_1 = require("./LootItem");
const LootType_1 = require("./LootType");
class Loot {
    constructor() {
        this.lootId = 0;
        this.lootItems = [];
    }
    createLootItem(x, y, type, bullets = 0) {
        this.lootItems.push(new LootItem_1.default(this.lootId++, x, y, type, bullets));
    }
    createMainLootItems() {
        let x = 0;
        let y = 0;
        const shift = 100;
        this.createLootItem(x++ * shift, y++ * shift, LootType_1.LootType.Pistol, 10);
        this.createLootItem(x++ * shift, y++ * shift, LootType_1.LootType.Machinegun, 30);
        this.createLootItem(x++ * shift, y++ * shift, LootType_1.LootType.Shotgun, 2);
        this.createLootItem(x++ * shift, y++ * shift, LootType_1.LootType.Rifle, 5);
        this.createLootItem(x++ * shift, y++ * shift, LootType_1.LootType.Hammer);
        this.createLootItem(x++ * shift, y++ * shift, LootType_1.LootType.Granade);
        this.createLootItem(x++ * shift, y++ * shift, LootType_1.LootType.Smoke);
        this.createLootItem(x++ * shift, y++ * shift, LootType_1.LootType.RedAmmo, 30);
        this.createLootItem(x++ * shift, y++ * shift, LootType_1.LootType.BlueAmmo, 30);
        this.createLootItem(x++ * shift, y++ * shift, LootType_1.LootType.GreenAmmo, 30);
        this.createLootItem(x++ * shift, y++ * shift, LootType_1.LootType.OrangeAmmo, 30);
        this.createLootItem(x++ * shift, y++ * shift, LootType_1.LootType.Vest, 30);
        this.createLootItem(x++ * shift, y++ * shift, LootType_1.LootType.Vest, 30);
        this.createLootItem(x++ * shift, y++ * shift, LootType_1.LootType.Medkit, 30);
        this.createLootItem(x++ * shift, y++ * shift, LootType_1.LootType.Medkit, 30);
        this.createLootItem(x++ * shift, y++ * shift, LootType_1.LootType.Medkit, 30);
        this.createLootItem(x++ * shift, y++ * shift, LootType_1.LootType.Medkit, 30);
        this.createLootItem(x++ * shift, y++ * shift, LootType_1.LootType.Scope2, 30);
        this.createLootItem(x++ * shift, y++ * shift, LootType_1.LootType.Scope4, 30);
        this.createLootItem(x++ * shift, y++ * shift, LootType_1.LootType.Scope6, 30);
    }
}
exports.default = Loot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9vdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Mb290LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUNBQWtDO0FBQ2xDLHlDQUFzQztBQUV0QyxNQUFxQixJQUFJO0lBSXhCO1FBSFEsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUMzQixjQUFTLEdBQWUsRUFBRSxDQUFDO0lBRVosQ0FBQztJQUVoQixjQUFjLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBRSxJQUFjLEVBQUUsVUFBa0IsQ0FBQztRQUN2RSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLGtCQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELG1CQUFtQjtRQUNsQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDbEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsS0FBSyxFQUFFLG1CQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRSxHQUFHLEtBQUssRUFBRSxtQkFBUSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFDLEVBQUUsR0FBRyxLQUFLLEVBQUUsbUJBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxLQUFLLEVBQUUsQ0FBQyxF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