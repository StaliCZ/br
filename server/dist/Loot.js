"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LootItem_1 = require("./LootItem");
const LootType_1 = require("./LootType");
const RoundObstacle_1 = require("./RoundObstacle");
const RectangleObstacle_1 = require("./RectangleObstacle");
class Loot {
    constructor(map) {
        this.lootId = 0;
        this.lootItems = [];
        this.randomPositionAttempts = 0;
        this.maxRandomPositionAttempts = 1000;
        this.map = map;
    }
    createLootItem(centerX, centerY, type, quantity = 1) {
        const loot = new LootItem_1.default(this.lootId++, centerX, centerY, type, quantity);
        if (centerX === 0 && centerY === 0)
            this.setRandomPosition(loot);
        this.lootItems.push(loot);
    }
    setRandomPosition(loot) {
        this.randomPositionAttempts++;
        if (this.randomPositionAttempts > this.maxRandomPositionAttempts)
            console.log('err: maxRandomPositionAttempts');
        const lootSize = loot.size * 3;
        const randomX = Math.floor(Math.random() * (this.map.getSize() - lootSize * 2)) + lootSize;
        const randomY = Math.floor(Math.random() * (this.map.getSize() - lootSize * 2)) + lootSize;
        loot.setX(randomX);
        loot.setY(randomY);
        //repeat
        if (this.randomPositionCollision(loot) && this.randomPositionAttempts < this.maxRandomPositionAttempts) {
            this.setRandomPosition(loot);
        }
        else {
            //done
            const lootItemGap = loot.size;
            if (loot.type === LootType_1.LootType.Pistol) {
                let directionX = 1;
                let directionY = 1;
                if (Math.random() > 0.5)
                    directionX = -1;
                if (Math.random() > 0.5)
                    directionY = -1;
                //+ammo
                this.lootItems.push(new LootItem_1.default(this.lootId++, loot.getCenterX() + lootItemGap * directionX, loot.getCenterY() + lootItemGap * directionY, LootType_1.LootType.OrangeAmmo, 30));
            }
            else if (loot.type === LootType_1.LootType.Rifle) {
                let directionX = 1;
                let directionY = 1;
                if (Math.random() > 0.5)
                    directionX = -1;
                if (Math.random() > 0.5)
                    directionY = -1;
                //+ammo
                this.lootItems.push(new LootItem_1.default(this.lootId++, loot.getCenterX() + lootItemGap * directionX, loot.getCenterY() + lootItemGap * directionY, LootType_1.LootType.GreenAmmo, 20));
            }
            else if (loot.type === LootType_1.LootType.Shotgun) {
                //+ammo
                let directionX = 1;
                let directionY = 1;
                if (Math.random() > 0.5)
                    directionX = -1;
                if (Math.random() > 0.5)
                    directionY = -1;
                this.lootItems.push(new LootItem_1.default(this.lootId++, loot.getCenterX() + lootItemGap * directionX, loot.getCenterY() + lootItemGap * directionY, LootType_1.LootType.RedAmmo, 10));
            }
            else if (loot.type === LootType_1.LootType.Machinegun) {
                //+ammo
                let directionX = 1;
                let directionY = 1;
                if (Math.random() > 0.5)
                    directionX = -1;
                if (Math.random() > 0.5)
                    directionY = -1;
                this.lootItems.push(new LootItem_1.default(this.lootId++, loot.getCenterX() + lootItemGap * directionX, loot.getCenterY() + lootItemGap * directionY, LootType_1.LootType.BlueAmmo, 30));
            }
        }
    }
    randomPositionCollision(loot) {
        for (const obstacle of this.map.rectangleObstacles) {
            if (this.lootInObstacle(loot, obstacle))
                return true;
        }
        for (const obstacle of this.map.impassableRoundObstacles) {
            if (this.lootInObstacle(loot, obstacle))
                return true;
        }
        for (const obstacle of this.map.bushes) {
            if (this.lootInObstacle(loot, obstacle))
                return true;
        }
        for (const obstacle of this.lootItems) {
            if (this.lootInObstacle(loot, obstacle))
                return true;
        }
        return false;
    }
    lootInObstacle(loot, obstacle) {
        let x = 0, y = 0, width = 0, height = 0;
        if (obstacle instanceof RectangleObstacle_1.default) {
            width = obstacle.width;
            height = obstacle.height;
            x = obstacle.x;
            y = obstacle.y;
        }
        if (obstacle instanceof RoundObstacle_1.default) {
            width = obstacle.size;
            height = obstacle.size;
            x = obstacle.x;
            y = obstacle.y;
        }
        if (obstacle instanceof LootItem_1.default) {
            width = obstacle.size;
            height = obstacle.size;
            x = obstacle.getX();
            y = obstacle.getY();
        }
        //bigger loot size
        const gap = 2 * loot.size;
        const lootSize = loot.size + gap;
        if (x + width >= loot.getX() - lootSize &&
            x <= loot.getX() + lootSize &&
            loot.getY() + lootSize >= y &&
            loot.getY() - lootSize <= y + height) {
            return true;
        }
        else {
            return false;
        }
    }
    //loot balancer
    createMainLootItems(players) {
        this.createLootItem(0, 0, LootType_1.LootType.Granade, 10);
        this.createLootItem(0, 0, LootType_1.LootType.Granade, 10);
        this.createLootItem(0, 0, LootType_1.LootType.Granade, 10);
        this.createLootItem(0, 0, LootType_1.LootType.Vest);
        this.createLootItem(0, 0, LootType_1.LootType.Scope2);
        this.createLootItem(0, 0, LootType_1.LootType.Pistol, 10);
        this.createLootItem(0, 0, LootType_1.LootType.Pistol, 10);
        for (let i = 0; i < players; i++) {
            if (Math.random() > 0.5)
                this.createLootItem(0, 0, LootType_1.LootType.Pistol, 10);
            if (Math.random() > 0.5)
                this.createLootItem(0, 0, LootType_1.LootType.Rifle, 5);
            if (Math.random() > 0.5)
                this.createLootItem(0, 0, LootType_1.LootType.Shotgun, 2);
            if (Math.random() > 0.5)
                this.createLootItem(0, 0, LootType_1.LootType.Machinegun, 30);
            if (Math.random() > 0.5)
                this.createLootItem(0, 0, LootType_1.LootType.Hammer);
            if (Math.random() > 0.5)
                this.createLootItem(0, 0, LootType_1.LootType.Vest);
            if (Math.random() > 0.5)
                this.createLootItem(0, 0, LootType_1.LootType.Scope2);
            if (Math.random() > 0.5)
                this.createLootItem(0, 0, LootType_1.LootType.Scope4);
            if (Math.random() > 0.5)
                this.createLootItem(0, 0, LootType_1.LootType.Scope6);
            if (Math.random() > 0.5)
                this.createLootItem(0, 0, LootType_1.LootType.Granade, 3);
            if (Math.random() > 0.5)
                this.createLootItem(0, 0, LootType_1.LootType.Smoke, 3);
            if (Math.random() > 0.5)
                this.createLootItem(0, 0, LootType_1.LootType.Medkit);
            if (Math.random() > 0.5)
                this.createLootItem(0, 0, LootType_1.LootType.RedAmmo, 10);
            if (Math.random() > 0.5)
                this.createLootItem(0, 0, LootType_1.LootType.GreenAmmo, 20);
            if (Math.random() > 0.5)
                this.createLootItem(0, 0, LootType_1.LootType.BlueAmmo, 30);
            if (Math.random() > 0.5)
                this.createLootItem(0, 0, LootType_1.LootType.OrangeAmmo, 30);
        }
    }
}
exports.default = Loot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9vdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9Mb290LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUNBQWtDO0FBQ2xDLHlDQUFzQztBQUd0QyxtREFBNEM7QUFDNUMsMkRBQW9EO0FBR3BELE1BQXFCLElBQUk7SUFPeEIsWUFBWSxHQUFRO1FBTFosV0FBTSxHQUFXLENBQUMsQ0FBQztRQUMzQixjQUFTLEdBQWUsRUFBRSxDQUFDO1FBQ25CLDJCQUFzQixHQUFXLENBQUMsQ0FBQztRQUNuQyw4QkFBeUIsR0FBVyxJQUFJLENBQUM7UUFHaEQsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDaEIsQ0FBQztJQUVELGNBQWMsQ0FBQyxPQUFlLEVBQUUsT0FBZSxFQUFFLElBQWMsRUFBRSxXQUFtQixDQUFDO1FBQ3BGLE1BQU0sSUFBSSxHQUFHLElBQUksa0JBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDM0UsSUFBSSxPQUFPLEtBQUssQ0FBQyxJQUFJLE9BQU8sS0FBSyxDQUFDO1lBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFTyxpQkFBaUIsQ0FBQyxJQUFjO1FBQ3ZDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQzlCLElBQUksSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyx5QkFBeUI7WUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFDaEgsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7UUFDL0IsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMs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QUUsQ0FBQyxFQUFFLG1CQUFRLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3pFLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUc7Z0JBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLG1CQUFRLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzNFLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUc7Z0JBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLG1CQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzFFLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUc7Z0JBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLG1CQUFRLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzVFO0lBQ0YsQ0FBQztDQVNEO0FBbk1ELHVCQW1NQyJ9