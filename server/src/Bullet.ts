import Map from './Map';
import Point from './Point';
import { Player } from './Player';
import Gun from './Gun';
import Granade from './Granade';

export default class Bullet {
	readonly id: number;
	readonly size: number = 1;
	readonly range: number;
	private x: number = 0;
	private y: number = 0;
	private angle: number = 0;
	private shiftX: number = 0;
	private shiftY: number = 0;
	private distance: number = 0;
	private active: boolean = true;
	//@ts-ignore
	private map: Map;
	private players: Player[] = [];

	private constructor(id: number, range: number) {
		this.id = id;
		this.range = range;

		/*
		this.id = id;
		this.map = map;
		this.players = players;
		this.x = player.getCenterX();
		this.y = player.getCenterY();
		//spray
		let randomchange = Math.round(Math.random() * gun.spray * 100) / 100;
		let randomDirection = Math.round(Math.random());
		if (!randomDirection) randomDirection = -1;
		this.angle = player.getAngle() + randomchange * randomDirection;
		this.angle += shiftAngle;
		if (this.angle < 0) {
			this.angle = 360 + this.angle;
		}
		if (this.angle >= 360) {
			this.angle = 360 - this.angle;
		}
		this.range = gun.range;
		//triangle
		const bulletSpeed = gun.bulletSpeed;
		this.shiftX = Math.sin(this.angle * Math.PI / 180) * bulletSpeed;
		this.shiftY = Math.cos(this.angle * Math.PI / 180) * bulletSpeed;

		//start shift to edge the of player
		const bulletStartShift = player.radius / gun.bulletSpeed + 0.1;
		this.x += this.shiftX * bulletStartShift;
		this.y -= this.shiftY * bulletStartShift;

		//shift to the edge of gun
		const bulletShiftToTheGunEdge = Math.ceil(gun.length / gun.bulletSpeed);
		for (let i = 0; i < bulletShiftToTheGunEdge; i++) {
			this.move();
		}
		*/
	}

	//constructor
	static makeBullet(id: number, player: Player, gun: Gun, map: Map, players: Player[], shiftAngle: number = 0): Bullet {
		const instance = new Bullet(id, gun.range);
		instance.map = map;
		instance.players = players;
		instance.x = player.getCenterX();
		instance.y = player.getCenterY();
		//spray
		let randomchange = Math.round(Math.random() * gun.spray * 100) / 100;
		let randomDirection = Math.round(Math.random());
		if (!randomDirection) randomDirection = -1;
		instance.angle = player.getAngle() + randomchange * randomDirection;
		instance.angle += shiftAngle;
		if (instance.angle < 0) {
			instance.angle = 360 + instance.angle;
		}
		if (instance.angle >= 360) {
			instance.angle = 360 - instance.angle;
		}
		//triangle
		const bulletSpeed = gun.bulletSpeed;
		instance.shiftX = Math.sin(instance.angle * Math.PI / 180) * bulletSpeed;
		instance.shiftY = Math.cos(instance.angle * Math.PI / 180) * bulletSpeed;

		//start shift to edge the of player
		const bulletStartShift = player.radius / gun.bulletSpeed + 0.1;
		instance.x += instance.shiftX * bulletStartShift;
		instance.y -= instance.shiftY * bulletStartShift;

		//shift to the edge of gun
		const bulletShiftToTheGunEdge = Math.ceil(gun.length / gun.bulletSpeed);
		for (let i = 0; i < bulletShiftToTheGunEdge; i++) {
			instance.move();
		}
		return instance;
	}

	//constructor
	static makeFragment(id: number, granade: Granade, map: Map, players: Player[], shiftAngle: number): Bullet {
		const instance = new Bullet(id, granade.fragmentRange);
		instance.map = map;
		instance.players = players;
		instance.x = granade.getX();
		instance.y = granade.getY();
		//spray
		let randomchange = Math.round(Math.random() * granade.fragmentSpray * 100) / 100;
		let randomDirection = Math.round(Math.random());
		if (!randomDirection) randomDirection = -1;
		instance.angle = randomchange * randomDirection;
		instance.angle += shiftAngle;
		if (instance.angle < 0) {
			instance.angle = 360 + instance.angle;
		}
		if (instance.angle >= 360) {
			instance.angle = 360 - instance.angle;
		}
		//triangle
		const bulletSpeed = granade.fragmentSpeed;
		instance.shiftX = Math.sin(instance.angle * Math.PI / 180) * bulletSpeed;
		instance.shiftY = Math.cos(instance.angle * Math.PI / 180) * bulletSpeed;
		return instance;
	}

	move(): void {
		if (!this.collisions()) {
			this.x += this.shiftX;
			this.y -= this.shiftY;
		}
	}

	private collisions(): boolean {
		const bulletPoint = new Point(this.getCenterX(), this.getCenterY());
		//rounds
		if (this.active) {
			for (const obstacle of this.map.impassableRoundObstacles) {
				if (obstacle.isActive() && obstacle.isPointIn(bulletPoint)) {
					obstacle.acceptHit(bulletPoint);
					this.active = false;
					return true;
				}
			}
		}
		//rects
		if (this.active) {
			for (const obstacle of this.map.rectangleObstacles) {
				if (obstacle.isActive() && obstacle.isPointIn(bulletPoint)) {
					obstacle.acceptHit();
					this.active = false;
					return true;
				}
			}
		}
		//players
		if (this.active) {
			for (const player of this.players) {
				if (player.isActive() && player.isPointIn(bulletPoint)) {
					player.acceptHit(1);
					if (!player.isActive()) player.die();
					this.active = false;
					return true;
				}
			}
		}
		return false;
	}

	getX(): number {
		return this.x;
	}

	getY(): number {
		return this.y;
	}

	getCenterX(): number {
		return this.x + this.size / 2;
	}

	getCenterY(): number {
		return this.y + this.size / 2;
	}

	getAngle(): number {
		return this.angle;
	}

	flying(): boolean {
		let state = true;
		this.distance++;
		if (this.distance > this.range) state = false;
		if (!this.active) state = false;
		return state;
	}
}
