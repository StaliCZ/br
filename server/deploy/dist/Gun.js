"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Gun {
    constructor(length, range, bulletSpeed, spray, bullets, bulletsMax) {
        this.range = range;
        this.bulletSpeed = bulletSpeed;
        this.length = length;
        this.spray = spray;
        this.bullets = bullets;
        this.bulletsMax = bulletsMax;
    }
    ready() {
        return this.bullets > 0;
    }
    fire() {
        this.bullets--;
    }
    reload(bullets) {
        this.bullets += bullets;
    }
    getBullets() {
        return this.bullets;
    }
}
exports.default = Gun;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3VuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0d1bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQXFCLEdBQUc7SUFRdkIsWUFDQyxNQUFjLEVBQ2QsS0FBYSxFQUNiLFdBQW1CLEVBQ25CLEtBQWEsRUFDYixPQUFlLEVBQ2YsVUFBa0I7UUFFbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDOUIsQ0FBQztJQUVELEtBQUs7UUFDSixPQUFPLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJO1FBQ0gsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBZTtRQUNyQixJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQztJQUN6QixDQUFDO0lBRUQsVUFBVTtRQUNULE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUNyQixDQUFDO0NBQ0Q7QUF2Q0Qsc0JBdUNDIn0=