import Player from './Player';
import { Weapon } from './Weapon';
import Map from './Map';
import { Mouse } from './Controller';
import WaterTerrainData from './WaterTerrainData';
import { TerrainType } from './Terrain';
import Bullet from './Bullet';
import RoundObstacle from './RoundObstacle';
import RectangleObstacle from './RectangleObstacle';
import Tree from './Tree';
import Rock from './Rock';
import Bush from './Bush';
import Wall from './Wall';
import ServerClientSync from './ServerClientSync';
import { Snapshot } from './Snapshot';
import MyHtmlElements from './MyHtmlElements';
import Editor from './Editor';
import Colors from './Colors';
import BulletLine from './BulletLine';
import PartBulletLine from './PartBulletLine';
import CollisionPoints from './CollisionPoints';
import Point from './Point';
import ZoneSnapshot from './ZoneSnapshot';
import SnapshotManager from './SnapshotManager';
import { PlayerOld } from './PlayerOld';
import { LootType } from './LootType';
import Scope from './Scope';

type DrawData = {
	x: number;
	y: number;
	size: number;
	width: number;
	height: number;
	isOnScreen: boolean;
};

interface RoundObject {
	x: number;
	y: number;
	size: number;
}

interface RectObject {
	x: number;
	y: number;
	width: number;
	height: number;
}

export default class View {
	private scope: Scope;
	private snapshotManager: SnapshotManager;
	private gameScreen: HTMLCanvasElement;
	private editorScreen: HTMLCanvasElement;
	private mapScreen: HTMLCanvasElement;
	private helperScreen: HTMLCanvasElement;
	private ctxGame: CanvasRenderingContext2D;
	private ctxMap: CanvasRenderingContext2D;
	private ctxEditor: CanvasRenderingContext2D;

	private bushSVG: HTMLImageElement;
	private rockSVG: HTMLImageElement;
	private treeSVG: HTMLImageElement;
	private pistolSVG: HTMLImageElement;
	private machinegunSVG: HTMLImageElement;
	private shotgunSVG: HTMLImageElement;
	private rifleSVG: HTMLImageElement;
	private hammerSVG: HTMLImageElement;
	private cursorSVG: HTMLImageElement;
	private granadeSVG: HTMLImageElement;
	private smokeSVG: HTMLImageElement;
	private medkitSVG: HTMLImageElement;
	private smokeCloudSVG: HTMLImageElement;
	private loadingProgresSVG: HTMLImageElement;
	private loadingCircleSVG: HTMLImageElement;
	private waterTrianglePNG: HTMLImageElement;

	private pistolLootSVG: HTMLImageElement;
	private shotgunLootSVG: HTMLImageElement;
	private machinegunLootSVG: HTMLImageElement;
	private rifleLootSVG: HTMLImageElement;

	private hammerLootSVG: HTMLImageElement;
	private granadeLootSVG: HTMLImageElement;
	private smokeLootSVG: HTMLImageElement;

	private redAmmoLootSVG: HTMLImageElement;
	private greenAmmoLootSVG: HTMLImageElement;
	private blueAmmoLootSVG: HTMLImageElement;
	private orangeAmmoLootSVG: HTMLImageElement;

	private medkitLootSVG: HTMLImageElement;
	private vestLootSVG: HTMLImageElement;
	private scope2LootSVG: HTMLImageElement;
	private scope4LootSVG: HTMLImageElement;
	private scope6LootSVG: HTMLImageElement;

	private waterTerrainData: WaterTerrainData;
	private resolutionAdjustment: number = 1;
	private finalResolutionAdjustment: number = 1;
	private screenCenterX: number;
	private screenCenterY: number;
	private map: Map;
	private mouse: Mouse;
	myPlayer: Player;

	private serverClientSync: ServerClientSync;
	private myHtmlElements: MyHtmlElements;

	private colors: Colors;
	private bulletLines: BulletLine[] = [];
	private collisionPoints: CollisionPoints;

	private takeLootText: string = '';

	constructor(
		map: Map,
		mouse: Mouse,
		waterTerrainData: WaterTerrainData,
		serverClientSync: ServerClientSync,
		myHtmlElements: MyHtmlElements,
		collisionPoints: CollisionPoints,
		snapshotManager: SnapshotManager
	) {
		this.scope = new Scope();
		this.snapshotManager = snapshotManager;
		this.colors = new Colors();
		this.serverClientSync = serverClientSync;
		this.myHtmlElements = myHtmlElements;
		this.map = map;
		this.collisionPoints = collisionPoints;
		this.mouse = mouse;
		this.gameScreen = <HTMLCanvasElement>this.myHtmlElements.gameScreen;
		this.editorScreen = <HTMLCanvasElement>this.myHtmlElements.editor.screen;
		this.mapScreen = <HTMLCanvasElement>this.myHtmlElements.mapScreen;
		this.helperScreen = <HTMLCanvasElement>this.myHtmlElements.helperScreen;
		this.ctxGame = this.gameScreen.getContext('2d');
		this.ctxMap = this.mapScreen.getContext('2d');
		this.ctxEditor = this.editorScreen.getContext('2d');

		this.bushSVG = new Image();
		this.bushSVG.src = 'img/bush.svg';

		this.rockSVG = new Image();
		this.rockSVG.src = 'img/rock.svg';

		this.treeSVG = new Image();
		this.treeSVG.src = 'img/tree.svg';

		this.cursorSVG = new Image();
		this.cursorSVG.src = 'img/cursor.svg';

		this.loadingProgresSVG = new Image();
		this.loadingProgresSVG.src = 'img/loadingProgres.svg';

		this.loadingCircleSVG = new Image();
		this.loadingCircleSVG.src = 'img/loadingCircle.svg';

		this.pistolSVG = new Image();
		this.pistolSVG.src = 'img/pistol.svg';

		this.machinegunSVG = new Image();
		this.machinegunSVG.src = 'img/machinegun.svg';

		this.rifleSVG = new Image();
		this.rifleSVG.src = 'img/rifle.svg';

		this.shotgunSVG = new Image();
		this.shotgunSVG.src = 'img/shotgun.svg';

		this.hammerSVG = new Image();
		this.hammerSVG.src = 'img/hammer.svg';

		this.granadeSVG = new Image();
		this.granadeSVG.src = 'img/granade.svg';

		this.smokeSVG = new Image();
		this.smokeSVG.src = 'img/smoke.svg';

		this.medkitSVG = new Image();
		this.medkitSVG.src = 'img/medkit.svg';

		this.smokeCloudSVG = new Image();
		this.smokeCloudSVG.src = 'img/smokeCloud.svg';

		this.rifleLootSVG = new Image();
		this.rifleLootSVG.src = 'img/rifleLoot.svg';

		this.pistolLootSVG = new Image();
		this.pistolLootSVG.src = 'img/pistolLoot.svg';

		this.shotgunLootSVG = new Image();
		this.shotgunLootSVG.src = 'img/shotgunLoot.svg';

		this.machinegunLootSVG = new Image();
		this.machinegunLootSVG.src = 'img/machinegunLoot.svg';

		this.hammerLootSVG = new Image();
		this.hammerLootSVG.src = 'img/hammerLoot.svg';

		this.granadeLootSVG = new Image();
		this.granadeLootSVG.src = 'img/granadeLoot.svg';

		this.smokeLootSVG = new Image();
		this.smokeLootSVG.src = 'img/smokeLoot.svg';

		this.redAmmoLootSVG = new Image();
		this.redAmmoLootSVG.src = 'img/redAmmoLoot.svg';

		this.greenAmmoLootSVG = new Image();
		this.greenAmmoLootSVG.src = 'img/greenAmmoLoot.svg';

		this.blueAmmoLootSVG = new Image();
		this.blueAmmoLootSVG.src = 'img/blueAmmoLoot.svg';

		this.orangeAmmoLootSVG = new Image();
		this.orangeAmmoLootSVG.src = 'img/orangeAmmoLoot.svg';

		this.medkitLootSVG = new Image();
		this.medkitLootSVG.src = 'img/medkitLoot.svg';
		this.vestLootSVG = new Image();
		this.vestLootSVG.src = 'img/vestLoot.svg';
		this.scope2LootSVG = new Image();
		this.scope2LootSVG.src = 'img/scope2Loot.svg';
		this.scope4LootSVG = new Image();
		this.scope4LootSVG.src = 'img/scope4Loot.svg';
		this.scope6LootSVG = new Image();
		this.scope6LootSVG.src = 'img/scope6Loot.svg';

		this.waterTrianglePNG = new Image();
		this.waterTrianglePNG.src = 'img/waterTriangle.png';

		this.waterTerrainData = waterTerrainData;
		this.waterTrianglePNG.onload = () => {
			this.saveWaterPixels(TerrainType.WaterTriangle1);
			this.saveWaterPixels(TerrainType.WaterTriangle2);
			this.saveWaterPixels(TerrainType.WaterTriangle3);
			this.saveWaterPixels(TerrainType.WaterTriangle4);
			//this.waterTerrainData.write();
		};
		this.screenResize();
	}

	screenResize(): void {
		const el = this.myHtmlElements;
		//gameScreen
		this.gameScreen.width = window.innerWidth;
		this.gameScreen.height = window.innerHeight;
		el.zoneSVG.setAttribute('width', window.innerWidth.toString());
		el.zoneSVG.setAttribute('height', window.innerHeight.toString());
		//mapScreen
		const mapSize = Math.floor((window.innerWidth / 5 + window.innerHeight / 5) / 2);
		this.mapScreen.width = mapSize;
		this.mapScreen.height = mapSize;
		el.mapZoneSVG.setAttribute('width', mapSize.toString());
		el.mapZoneSVG.setAttribute('height', mapSize.toString());
		el.mapContainer.style.width = (mapSize + 10).toString() + 'px';
		el.mapContainer.style.height = (mapSize + 10).toString() + 'px';
		//center
		this.screenCenterX = window.innerWidth / 2;
		this.screenCenterY = window.innerHeight / 2;
		this.changeResolutionAdjustment();
	}

	calculateServerPosition(point: Point): Point {
		let x, y;
		if (this.screenCenterX > point.x) {
			x = (this.screenCenterX - point.x) * -1;
		}
		else {
			x = point.x - this.screenCenterX;
		}
		if (this.screenCenterY > point.y) {
			y = (this.screenCenterY - point.y) * -1;
		}
		else {
			y = point.y - this.screenCenterY;
		}
		x /= this.finalResolutionAdjustment;
		y /= this.finalResolutionAdjustment;
		x += this.myPlayer.getCenterX();
		y += this.myPlayer.getCenterY();
		return new Point(x, y);
	}

	/*
	private isPointInZone(serverPoint: Point, zoneSnapshot: ZoneSnapshot): boolean {
		//triangle
		const x = zoneSnapshot.oX - serverPoint.x;
		const y = zoneSnapshot.oY - serverPoint.y;
		const radius = Math.sqrt(x * x + y * y);
		if (radius <= zoneSnapshot.oR) return true;
		return false;
	}
	*/

	private changeResolutionAdjustment(): void {
		const defaultWidth = 1920;
		const defaultHeight = 1050;
		const width = this.gameScreen.width / defaultWidth;
		const height = this.gameScreen.height / defaultHeight;
		const finalAdjustment = (width + height) / 2;
		this.resolutionAdjustment = finalAdjustment;
	}

	private saveWaterPixels(waterType: TerrainType): void {
		const ctx = this.helperScreen.getContext('2d');
		this.helperScreen.width = this.waterTrianglePNG.width;
		this.helperScreen.height = this.waterTrianglePNG.height;
		//white background
		ctx.fillStyle = '#FFFFFF';
		ctx.fillRect(0, 0, this.helperScreen.width, this.helperScreen.height);
		let middleImage = this.waterTrianglePNG.width / 2;
		ctx.save();
		ctx.translate(middleImage, middleImage);
		switch (waterType) {
			case TerrainType.WaterTriangle1:
				ctx.rotate(0 * Math.PI / 180);
				break;
			case TerrainType.WaterTriangle2:
				ctx.rotate(90 * Math.PI / 180);
				break;
			case TerrainType.WaterTriangle3:
				ctx.rotate(180 * Math.PI / 180);
				break;
			case TerrainType.WaterTriangle4:
				ctx.rotate(270 * Math.PI / 180);
				break;
		}
		ctx.drawImage(this.waterTrianglePNG, -middleImage, -middleImage);
		ctx.restore();

		//worker
		if (typeof Worker !== 'undefined') {
			const worker = new Worker('workerFindWater.js');
			worker.onmessage = (e) => {
				this.waterTerrainData.setData(e.data.type, e.data.data);
			};
			const data = ctx.getImageData(0, 0, this.waterTrianglePNG.width, this.waterTrianglePNG.height).data;
			worker.postMessage({
				data,
				size: this.waterTrianglePNG.width,
				type: waterType,
				time: new Date().getTime()
			});
		}
		else {
			console.log("Your browser doesn't support web workers.");
		}
	}

	private drawMap(): void {
		const ctx = this.ctxMap;
		const el = this.myHtmlElements;
		//clear canvas
		ctx.clearRect(0, 0, this.mapScreen.width, this.mapScreen.height);
		//background
		ctx.fillStyle = this.colors.grass;
		ctx.fillRect(0, 0, this.mapScreen.width, this.mapScreen.height);
		const blockSize = this.mapScreen.width / (this.map.getSize() / this.map.getBlockSize());
		const sizeReduction = blockSize / this.map.getBlockSize();
		const biggerBlockSize = blockSize + blockSize / 50;
		//terrain
		for (const terrain of this.map.terrain) {
			const x = terrain.x * sizeReduction;
			const y = terrain.y * sizeReduction;
			if (terrain.type === TerrainType.Water) {
				ctx.fillStyle = this.colors.water;
				ctx.fillRect(x, y, biggerBlockSize, biggerBlockSize);
			}
			if (terrain.type !== TerrainType.Water) {
				const middleImage = biggerBlockSize / 2;
				ctx.save();
				ctx.translate(x + middleImage, y + middleImage);
				ctx.rotate(terrain.angle * Math.PI / 180);
				ctx.drawImage(this.waterTrianglePNG, -middleImage, -middleImage, blockSize, blockSize);
				ctx.restore();
			}
		}
		//player
		{
			const playerSize = this.mapScreen.width / 40;
			const x = this.myPlayer.getCenterX() * sizeReduction - playerSize / 2;
			const y = this.myPlayer.getCenterY() * sizeReduction - playerSize / 2;
			ctx.beginPath();
			ctx.arc(x, y, playerSize, 0, 2 * Math.PI);
			ctx.fillStyle = this.colors.player;
			ctx.fill();
		}
		//zone
		//inner
		{
			const x = this.snapshotManager.zone.innerCircle.getCenterX() * sizeReduction;
			const y = this.snapshotManager.zone.innerCircle.getCenterY() * sizeReduction;
			const radius = this.snapshotManager.zone.innerCircle.getRadius() * sizeReduction;
			ctx.beginPath();
			ctx.arc(x, y, radius, 0, 2 * Math.PI);
			ctx.strokeStyle = 'green';
			ctx.stroke();
		}
		//outer
		{
			const x = this.snapshotManager.zone.outerCircle.getCenterX() * sizeReduction;
			const y = this.snapshotManager.zone.outerCircle.getCenterY() * sizeReduction;
			const radius = this.snapshotManager.zone.outerCircle.getRadius() * sizeReduction;
			//SVG change
			el.mapZoneCircle.setAttribute('r', radius.toString());
			el.mapZoneCircle.setAttribute('cx', x.toString());
			el.mapZoneCircle.setAttribute('cy', y.toString());
		}
	}

	drawEditor(editor: Editor): void {
		const ctx = this.ctxEditor;
		//clear canvas
		ctx.clearRect(0, 0, this.editorScreen.width, this.editorScreen.height);

		//grass
		ctx.fillStyle = this.colors.grass;
		ctx.fillRect(0, 0, this.editorScreen.width, this.editorScreen.height);

		//terrain blocks
		ctx.fillStyle = this.colors.water;
		for (const terrain of editor.terrains) {
			switch (terrain.type) {
				case TerrainType.Water:
					ctx.fillRect(terrain.x, terrain.y, editor.blockSize, editor.blockSize);
					break;
				case TerrainType.WaterTriangle1:
					ctx.drawImage(this.waterTrianglePNG, terrain.x, terrain.y, editor.blockSize, editor.blockSize);
					break;
				case TerrainType.WaterTriangle2:
				case TerrainType.WaterTriangle3:
				case TerrainType.WaterTriangle4:
					let middleImage = editor.blockSize / 2;
					ctx.save();
					ctx.translate(terrain.x + middleImage, terrain.y + middleImage);
					ctx.rotate(terrain.angle * Math.PI / 180);
					ctx.drawImage(
						this.waterTrianglePNG,
						-middleImage,
						-middleImage,
						editor.blockSize,
						editor.blockSize
					);
					ctx.restore();
					break;
			}
		}

		//terrain blocks under mouse
		let blockX, blockY;
		if (editor.getTerrainType() != null) {
			//x, y to [blocks]
			blockX = Math.floor(editor.getX() / editor.blockSize) * editor.blockSize;
			blockY = Math.floor(editor.getY() / editor.blockSize) * editor.blockSize;
			let angle = -1;
			switch (editor.getTerrainType()) {
				case TerrainType.Water:
					ctx.fillStyle = this.colors.water;
					ctx.fillRect(blockX, blockY, editor.blockSize, editor.blockSize);
					break;
				case TerrainType.Grass:
					ctx.fillStyle = this.colors.grass;
					ctx.fillRect(blockX, blockY, editor.blockSize, editor.blockSize);
					break;
				case TerrainType.WaterTriangle1:
					angle = 0;
					break;
				case TerrainType.WaterTriangle2:
					angle = 90;
					break;
				case TerrainType.WaterTriangle3:
					angle = 180;
					break;
				case TerrainType.WaterTriangle4:
					angle = 270;
					break;
			}
			if (angle !== -1) {
				//grass
				ctx.fillStyle = this.colors.grass;
				ctx.fillRect(blockX, blockY, editor.blockSize, editor.blockSize);
				let middleImage = editor.blockSize / 2;
				ctx.save();
				ctx.translate(blockX + middleImage, blockY + middleImage);
				ctx.rotate(angle * Math.PI / 180);
				ctx.drawImage(this.waterTrianglePNG, -middleImage, -middleImage, editor.blockSize, editor.blockSize);
				ctx.restore();
			}
		}

		//mapGrid
		ctx.fillStyle = this.colors.blockFrame;
		for (let i = 0; i < editor.getSize(); i++) {
			ctx.fillRect(i * editor.blockSize, 0, 1, editor.getSize() * editor.blockSize);
		}
		for (let i = 0; i < editor.getSize(); i++) {
			ctx.fillRect(0, i * editor.blockSize, editor.getSize() * editor.blockSize, 1);
		}

		if (editor.getTerrainType() != null) {
			//frame
			ctx.fillStyle = this.colors.blockFrameActive;
			ctx.fillRect(blockX, blockY, editor.blockSize, 1);
			ctx.fillRect(blockX, blockY + editor.blockSize, editor.blockSize, 1);

			ctx.fillRect(blockX, blockY, 1, editor.blockSize);
			ctx.fillRect(blockX + editor.blockSize, blockY, 1, editor.blockSize);
		}

		//objects
		ctx.save();
		if (editor.getObjectType() === 'delete') ctx.globalAlpha = 0.6;

		for (const rock of editor.rocks) {
			ctx.drawImage(this.rockSVG, rock.x, rock.y, rock.size, rock.size);
		}
		ctx.fillStyle = 'black';
		for (const wall of editor.walls) {
			ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
		}
		for (const bush of editor.bushes) {
			ctx.drawImage(this.bushSVG, bush.x, bush.y, bush.size, bush.size);
		}
		for (const tree of editor.trees) {
			ctx.drawImage(this.treeSVG, tree.x, tree.y, tree.size, tree.size);
		}
		ctx.restore();

		if (editor.getObjectType() === 'delete') {
			//delete object
			let deleteObject;
			for (const rock of editor.rocks) {
				const object = rock;
				if (
					object.x <= editor.getX() &&
					object.x + object.size >= editor.getX() &&
					object.y <= editor.getY() &&
					object.y + object.size >= editor.getY()
				) {
					deleteObject = object;
				}
			}
			for (const wall of editor.walls) {
				const object = wall;
				if (
					object.x <= editor.getX() &&
					object.x + object.width >= editor.getX() &&
					object.y <= editor.getY() &&
					object.y + object.height >= editor.getY()
				) {
					deleteObject = object;
				}
			}
			for (const bush of editor.bushes) {
				const object = bush;
				if (
					object.x <= editor.getX() &&
					object.x + object.size >= editor.getX() &&
					object.y <= editor.getY() &&
					object.y + object.size >= editor.getY()
				) {
					deleteObject = object;
				}
			}
			for (const tree of editor.trees) {
				const object = tree;
				if (
					object.x <= editor.getX() &&
					object.x + object.size >= editor.getX() &&
					object.y <= editor.getY() &&
					object.y + object.size >= editor.getY()
				) {
					deleteObject = object;
				}
			}

			if (deleteObject instanceof Rock) {
				ctx.drawImage(this.rockSVG, deleteObject.x, deleteObject.y, deleteObject.size, deleteObject.size);
			}
			if (deleteObject instanceof Bush) {
				ctx.drawImage(this.bushSVG, deleteObject.x, deleteObject.y, deleteObject.size, deleteObject.size);
			}
			if (deleteObject instanceof Tree) {
				ctx.drawImage(this.treeSVG, deleteObject.x, deleteObject.y, deleteObject.size, deleteObject.size);
			}
			if (deleteObject instanceof Wall) {
				ctx.fillStyle = 'black';
				ctx.fillRect(deleteObject.x, deleteObject.y, deleteObject.width, deleteObject.height);
			}
		}

		//objects under mouse
		if (editor.getObjectType()) {
			let size;
			switch (editor.getObjectType()) {
				case 'bush':
					size = editor.bush.size;
					ctx.drawImage(this.bushSVG, editor.getX() - size / 2, editor.getY() - size / 2, size, size);
					break;
				case 'rock':
					size = editor.rock.size;
					ctx.drawImage(this.rockSVG, editor.getX() - size / 2, editor.getY() - size / 2, size, size);
					break;
				case 'tree':
					size = editor.tree.size;
					ctx.drawImage(this.treeSVG, editor.getX() - size / 2, editor.getY() - size / 2, size, size);
					break;
				case 'rect':
					size = editor.rock.size;
					ctx.fillStyle = 'black';
					ctx.fillRect(editor.getX() - size / 2, editor.getY() - size / 2, size, size);
					break;
			}
		}
	}

	drawGame(myPlayerId: number): void {
		const betweenSnapshot = this.snapshotManager.betweenSnapshot;
		const players = this.snapshotManager.players;
		if (!betweenSnapshot) return;
		//my player
		if (!this.myPlayer) {
			for (const player of players) {
				if (player.id === myPlayerId) {
					this.myPlayer = player;
					break;
				}
			}
		}
		if (!this.myPlayer) return;

		//scope
		this.scope.setScope(this.snapshotManager.betweenSnapshot.i.s);
		this.finalResolutionAdjustment = this.scope.getFinalResolutionAdjustment(this.resolutionAdjustment);

		this.drawMap();

		const ctx = this.ctxGame;
		const el = this.myHtmlElements;

		//clear canvas
		ctx.clearRect(0, 0, this.gameScreen.width, this.gameScreen.height);

		//water
		ctx.fillStyle = this.colors.water;
		ctx.fillRect(0, 0, this.gameScreen.width, this.gameScreen.height);

		//grass blocks
		ctx.fillStyle = this.colors.grass;
		const blockSize = 300;
		for (const block of this.map.blocks) {
			const { x, y, size, isOnScreen } = this.howToDraw({ x: block.x, y: block.y, size: blockSize });
			if (isOnScreen) {
				ctx.fillRect(x, y, size, size);
			}
		}

		//water terrain blocks
		ctx.fillStyle = this.colors.water;
		for (const terrain of this.map.terrain) {
			const { x, y, width, height, isOnScreen } = this.howToDraw({
				x: terrain.x,
				y: terrain.y,
				size: terrain.size
			});
			if (isOnScreen) {
				if (terrain.type === TerrainType.Water) {
					ctx.fillRect(x, y, width, height);
				}
				else if (terrain.type === TerrainType.WaterTriangle1) {
					ctx.drawImage(this.waterTrianglePNG, x, y, width, height);
				}
				else if (
					terrain.type === TerrainType.WaterTriangle2 ||
					terrain.type === TerrainType.WaterTriangle3 ||
					terrain.type === TerrainType.WaterTriangle4
				) {
					let middleImage = width / 2;
					ctx.save();
					ctx.translate(x + middleImage, y + middleImage);
					ctx.rotate(terrain.angle * Math.PI / 180);
					ctx.drawImage(this.waterTrianglePNG, -middleImage, -middleImage, width, height);
					ctx.restore();
				}
			}
		}

		//mapGrid
		ctx.fillStyle = this.colors.blockFrame;
		const size2 = 1 * this.resolutionAdjustment;
		for (const block of this.map.blocks) {
			//top
			if (block.y === 0) {
				const { x, y, size, isOnScreen } = this.howToDraw({
					x: block.x,
					y: block.y,
					size: blockSize
				});
				if (isOnScreen) ctx.fillRect(x, y, size, size2);
			}
			//bottom
			{
				const { x, y, size, isOnScreen } = this.howToDraw({
					x: block.x,
					y: block.y + blockSize,
					size: blockSize
				});
				if (isOnScreen) ctx.fillRect(x, y, size, size2);
			}
			//left
			if (block.x === 0) {
				const { x, y, size, isOnScreen } = this.howToDraw({
					x: block.x,
					y: block.y,
					size: blockSize
				});
				if (isOnScreen) ctx.fillRect(x, y, size2, size);
			}
			//right
			{
				const { x, y, size, isOnScreen } = this.howToDraw({
					x: block.x + blockSize,
					y: block.y,
					size: blockSize
				});
				if (isOnScreen) ctx.fillRect(x, y, size2, size);
			}
		}

		//rocks
		for (const rock of this.map.rocks) {
			if (rock.isActive()) {
				const { x, y, size, isOnScreen } = this.howToDraw(rock);
				if (isOnScreen) {
					ctx.save();
					ctx.globalAlpha = rock.getOpacity();
					ctx.drawImage(this.rockSVG, x, y, size, size);
					ctx.restore();
				}
			}
		}

		//walls
		ctx.fillStyle = 'black';
		for (const rectangleObstacle of this.map.rectangleObstacles) {
			if (rectangleObstacle.isActive()) {
				const { x, y, width, height, isOnScreen } = this.howToDraw(rectangleObstacle);
				if (isOnScreen) {
					ctx.save();
					ctx.globalAlpha = rectangleObstacle.getOpacity();
					ctx.fillRect(x, y, width, height);
					ctx.restore();
				}
			}
		}

		//loot
		for (const loot of betweenSnapshot.l) {
			const { x, y, size, isOnScreen } = this.howToDraw(loot);
			let lootSVG;
			switch (loot.type) {
				case LootType.Pistol:
					lootSVG = this.pistolLootSVG;
					break;
				case LootType.Machinegun:
					lootSVG = this.machinegunLootSVG;
					break;
				case LootType.Shotgun:
					lootSVG = this.shotgunLootSVG;
					break;
				case LootType.Rifle:
					lootSVG = this.rifleLootSVG;
					break;

				case LootType.Smoke:
					lootSVG = this.smokeLootSVG;
					break;

				case LootType.Granade:
					lootSVG = this.granadeLootSVG;
					break;

				case LootType.Hammer:
					lootSVG = this.hammerLootSVG;
					break;

				case LootType.RedAmmo:
					lootSVG = this.redAmmoLootSVG;
					break;

				case LootType.BlueAmmo:
					lootSVG = this.blueAmmoLootSVG;
					break;

				case LootType.GreenAmmo:
					lootSVG = this.greenAmmoLootSVG;
					break;

				case LootType.OrangeAmmo:
					lootSVG = this.orangeAmmoLootSVG;
					break;

				case LootType.Vest:
					lootSVG = this.vestLootSVG;
					break;

				case LootType.Medkit:
					lootSVG = this.medkitLootSVG;
					break;

				case LootType.Scope2:
					lootSVG = this.scope2LootSVG;
					break;

				case LootType.Scope4:
					lootSVG = this.scope4LootSVG;
					break;

				case LootType.Scope6:
					lootSVG = this.scope6LootSVG;
					break;
			}
			ctx.drawImage(lootSVG, x, y, size, size);
		}

		//players
		for (const player of players) {
			//pistol
			if (player.getWeapon() === Weapon.Pistol) {
				//draw pistol
				const gunSize = 200;
				const gunX = player.getCenterX() - gunSize / 2;
				const gunY = player.getCenterY() - gunSize / 2;
				const { x, y, size, isOnScreen } = this.howToDraw({
					x: gunX,
					y: gunY,
					size: gunSize
				});
				if (isOnScreen) {
					let middleImage = size / 2;
					ctx.save();
					ctx.translate(x + middleImage, y + middleImage);
					ctx.rotate(player.getAngle() * Math.PI / 180);
					ctx.drawImage(this.pistolSVG, -middleImage, -middleImage, size, size);
					ctx.restore();
				}
			}
			//machinegun
			if (player.getWeapon() === Weapon.Machinegun) {
				const gunSize = 200;
				const gunX = player.getCenterX() - gunSize / 2;
				const gunY = player.getCenterY() - gunSize / 2;
				const { x, y, size, isOnScreen } = this.howToDraw({
					x: gunX,
					y: gunY,
					size: gunSize
				});
				if (isOnScreen) {
					let middleImage = size / 2;
					ctx.save();
					ctx.translate(x + middleImage, y + middleImage);
					ctx.rotate(player.getAngle() * Math.PI / 180);
					ctx.drawImage(this.machinegunSVG, -middleImage, -middleImage, size, size);
					ctx.restore();
				}
			}
			//shotgun
			if (player.getWeapon() === Weapon.Shotgun) {
				const gunSize = 200;
				const gunX = player.getCenterX() - gunSize / 2;
				const gunY = player.getCenterY() - gunSize / 2;
				const { x, y, size, isOnScreen } = this.howToDraw({
					x: gunX,
					y: gunY,
					size: gunSize
				});
				if (isOnScreen) {
					let middleImage = size / 2;
					ctx.save();
					ctx.translate(x + middleImage, y + middleImage);
					ctx.rotate(player.getAngle() * Math.PI / 180);
					ctx.drawImage(this.shotgunSVG, -middleImage, -middleImage, size, size);
					ctx.restore();
				}
			}
			//rifle
			if (player.getWeapon() === Weapon.Rifle) {
				const gunSize = 200;
				const gunX = player.getCenterX() - gunSize / 2;
				const gunY = player.getCenterY() - gunSize / 2;
				const { x, y, size, isOnScreen } = this.howToDraw({
					x: gunX,
					y: gunY,
					size: gunSize
				});
				if (isOnScreen) {
					let middleImage = size / 2;
					ctx.save();
					ctx.translate(x + middleImage, y + middleImage);
					ctx.rotate(player.getAngle() * Math.PI / 180);
					ctx.drawImage(this.rifleSVG, -middleImage, -middleImage, size, size);
					ctx.restore();
				}
			}
			//hammer
			if (player.getWeapon() === Weapon.Hammer) {
				const gunSize = 200;
				const gunX = player.getCenterX() - gunSize / 2;
				const gunY = player.getCenterY() - gunSize / 2;
				const { x, y, size, isOnScreen } = this.howToDraw({
					x: gunX,
					y: gunY,
					size: gunSize
				});
				if (isOnScreen) {
					let middleImage = size / 2;
					ctx.save();
					ctx.translate(x + middleImage, y + middleImage);
					ctx.rotate(player.getHammerAngle() * Math.PI / 180);
					ctx.drawImage(this.hammerSVG, -middleImage, -middleImage, size, size);
					ctx.restore();
					if (this.collisionPoints.isReady()) {
						//collisionPoints
						ctx.fillStyle = this.colors.collisionPoint;
						for (const point of this.collisionPoints.hammer[player.getHammerAngle()]) {
							const { x, y, size } = this.howToDraw({
								x: player.getCenterX() - 100 + point.x,
								y: player.getCenterY() - 100 + point.y,
								size: 1
							});
							ctx.fillRect(x, y, size, size);
						}
					}
				}
			}

			//player hands
			if (
				player.getWeapon() === Weapon.Hand ||
				player.getWeapon() === Weapon.Granade ||
				player.getWeapon() === Weapon.Smoke ||
				player.getWeapon() === Weapon.Medkit
			) {
				for (let i = 0; i < 2; i++) {
					const { x, y, size, isOnScreen } = this.howToDraw({
						x: player.hands[i].getX(),
						y: player.hands[i].getY(),
						size: player.hands[i].size
					});
					if (isOnScreen) {
						const radius = size / 2;
						//hand border
						ctx.beginPath();
						ctx.arc(x + radius, y + radius, radius, 0, 2 * Math.PI);
						ctx.fillStyle = this.colors.handBorder;
						ctx.fill();
						//hand
						const radiusHand = radius * 0.9;
						ctx.beginPath();
						ctx.arc(x + radius, y + radius, radiusHand, 0, 2 * Math.PI);
						ctx.fillStyle = this.colors.hand;
						ctx.fill();
						//hand collisionPoints
						/*
						ctx.fillStyle = this.colors.collisionPoint;
						for (const point of this.collisionPoints.hand) {
							const { x, y, size } = this.howToDraw({
								x: player.hands[i].getCenterX() + point.x,
								y: player.hands[i].getCenterY() + point.y,
								size: 1
							});
							ctx.fillRect(x, y, size, size);
						}
						*/
						//granade || smoke || medkit in hand
						if (
							(player.getWeapon() === Weapon.Granade ||
								player.getWeapon() === Weapon.Smoke ||
								player.getWeapon() === Weapon.Medkit) &&
							i === 1
						) {
							const granadeShiftAngle = 30;
							const playerAngle = player.getAngle();
							const shiftZ = player.hands[1].radius;
							//triangle
							const shiftX = Math.sin(playerAngle * Math.PI / 180) * shiftZ;
							const shiftY = Math.cos(playerAngle * Math.PI / 180) * shiftZ;

							const { x, y, size, isOnScreen } = this.howToDraw({
								x: player.hands[i].getX() + shiftX,
								y: player.hands[i].getY() - shiftY,
								size: player.hands[i].size
							});

							if (isOnScreen) {
								let middleImage = size / 2;
								ctx.save();
								ctx.translate(x + middleImage, y + middleImage);
								ctx.rotate((playerAngle - granadeShiftAngle) * Math.PI / 180);
								let SVG;
								if (player.getWeapon() === Weapon.Granade) SVG = this.granadeSVG;
								if (player.getWeapon() === Weapon.Smoke) SVG = this.smokeSVG;
								if (player.getWeapon() === Weapon.Medkit) SVG = this.medkitSVG;
								ctx.drawImage(SVG, -middleImage, -middleImage, size, size);
								ctx.restore();
							}
						}
					}
				}
			}

			//player body
			const { x, y, size, isOnScreen } = this.howToDraw({
				x: player.getX(),
				y: player.getY(),
				size: player.size
			});
			if (isOnScreen) {
				//vest
				const radius = size / 2;
				ctx.beginPath();
				ctx.arc(x + radius, y + radius, radius, 0, 2 * Math.PI);
				let colorVest = this.colors.handBorder;
				if (this.snapshotManager.betweenSnapshot.i.v) colorVest = this.colors.vest;
				ctx.fillStyle = colorVest;
				ctx.fill();
				//body
				let bodyRadius = radius * 0.95;
				ctx.beginPath();
				ctx.arc(x + radius, y + radius, bodyRadius, 0, 2 * Math.PI);
				ctx.fillStyle = this.colors.player;
				ctx.fill();
				//collisionPoints
				/*
				ctx.fillStyle = this.colors.collisionPoint;
				for (const point of this.collisionPoints.body) {
					const { x, y, size } = this.howToDraw({
						x: player.getCenterX() + point.x,
						y: player.getCenterY() + point.y,
						size: 1
					});
					ctx.fillRect(x, y, size, size);
				}
				*/
			}
		}

		//granades
		for (const granade of betweenSnapshot.g) {
			const granadeSize = 30 * granade.b;
			const { x, y, size, isOnScreen } = this.howToDraw({
				x: granade.x - granadeSize / 2,
				y: granade.y - granadeSize / 2,
				size: granadeSize
			});
			if (isOnScreen) {
				let middleImage = size / 2;
				ctx.save();
				ctx.translate(x + middleImage, y + middleImage);
				ctx.rotate(granade.a * Math.PI / 180);
				if (granade.t === 'g') {
					ctx.drawImage(this.granadeSVG, -middleImage, -middleImage, size, size);
				}
				if (granade.t === 's') {
					ctx.drawImage(this.smokeSVG, -middleImage, -middleImage, size, size);
				}
				ctx.restore();
			}
		}

		//bullet points
		ctx.fillStyle = 'orange';
		for (const bullet of betweenSnapshot.b) {
			//bullet point
			const { x, y, size, isOnScreen } = this.howToDraw({
				x: bullet.x,
				y: bullet.y,
				size: 3
			});
			if (isOnScreen) {
				ctx.fillRect(
					x - 1.5 * this.finalResolutionAdjustment,
					y - 1.5 * this.finalResolutionAdjustment,
					size,
					size
				);
			}
		}

		this.createBulletLines();
		//draw bullet lines
		for (const line of this.bulletLines) {
			for (const partLine of line.parts) {
				if (partLine.isActive()) {
					//draw part
					ctx.save();
					ctx.globalAlpha = 0.7 - partLine.getAge() / 14.3;
					ctx.beginPath();
					const { x: startX, y: startY } = this.howToDraw({
						x: partLine.startX,
						y: partLine.startY,
						size: 1
					});
					ctx.moveTo(startX, startY);
					const { x: endX, y: endY } = this.howToDraw({
						x: partLine.endX,
						y: partLine.endY,
						size: 1
					});
					ctx.lineTo(endX, endY);
					ctx.lineWidth = 3 - partLine.getAge() / 3.33;
					ctx.strokeStyle = 'white';
					ctx.stroke();
					ctx.restore();
					partLine.increaseAge();
				}
			}
		}

		//bushes
		for (const bush of this.map.bushes) {
			if (bush.isActive()) {
				const { x, y, size, isOnScreen } = this.howToDraw(bush);
				if (isOnScreen) {
					ctx.save();
					ctx.globalAlpha = bush.getOpacity();
					ctx.drawImage(this.bushSVG, x, y, size, size);
					ctx.restore();
				}
			}
		}

		//trees
		for (const tree of this.map.trees) {
			if (tree.isActive()) {
				const { x, y, size, isOnScreen } = this.howToDraw(tree);
				if (isOnScreen) {
					ctx.save();
					ctx.globalAlpha = tree.getOpacity();
					ctx.drawImage(this.treeSVG, x, y, size, size);
					ctx.restore();
				}
			}
		}

		//smokes
		for (const smoke of betweenSnapshot.s) {
			const { x, y, size, isOnScreen } = this.howToDraw({
				x: smoke.x - smoke.s / 2,
				y: smoke.y - smoke.s / 2,
				size: smoke.s
			});
			if (isOnScreen) {
				ctx.save();
				ctx.globalAlpha = smoke.o;
				ctx.drawImage(this.smokeCloudSVG, x, y, size, size);
				ctx.restore();
			}
		}

		//zone
		const { x, y, size: outerRadius } = this.howToDraw({
			x: this.snapshotManager.zone.outerCircle.getCenterX(),
			y: this.snapshotManager.zone.outerCircle.getCenterY(),
			size: this.snapshotManager.zone.outerCircle.getRadius()
		});

		el.zoneCircle.setAttribute('r', outerRadius.toString());
		el.zoneCircle.setAttribute('cx', x.toString());
		el.zoneCircle.setAttribute('cy', y.toString());

		//info
		{
			ctx.font = '20px Arial';
			ctx.fillStyle = this.colors.text;
			const x = 15;
			let row = 30;
			let rowMultiple = 8;
			//ctx.fillText('snapshots: ' + this.snapshots.length, x, row * ++rowMultiple);
			ctx.fillText('newerSnapshots: ' + this.snapshotManager.sumaNewer, x, row * ++rowMultiple);
			ctx.fillText('ping: ' + this.serverClientSync.getPing(), x, row * ++rowMultiple);
			ctx.fillText('timeDiference: ' + this.serverClientSync.getTimeDiference(), x, row * ++rowMultiple);
			ctx.fillText('drawDelay: ' + this.serverClientSync.getDrawDelay(), x, row * ++rowMultiple);
			if (!this.snapshotManager.olderExists) {
				ctx.fillText('olderSnapshot missing', x, row * ++rowMultiple);
			}
			if (!this.snapshotManager.newerExists) {
				ctx.fillText('newerSnapshot missing', x, row * ++rowMultiple);
			}
		}

		//healthBar
		el.healthBar.in.style.width = betweenSnapshot.i.h + '%';

		//loading
		const progres = Math.round(betweenSnapshot.i.l / betweenSnapshot.i.lE * 100);
		const seconds = Math.round((betweenSnapshot.i.lE - betweenSnapshot.i.l) / 1000 * 10) / 10;
		if (seconds) {
			el.loading.main.style.display = 'block';
			el.loading.text.style.display = 'block';
			el.loading.text.textContent = betweenSnapshot.i.lT;
			let secondsString = seconds.toString();
			switch (secondsString) {
				case '0':
					secondsString = ' 0.0';
					break;
				case '1':
					secondsString = ' 1.0';
					break;
				case '2':
					secondsString = ' 2.0';
					break;
				case '3':
					secondsString = ' 3.0';
					break;
				case '4':
					secondsString = ' 4.0';
					break;
				case '5':
					secondsString = ' 5.0';
					break;
			}
			el.loading.counter.textContent = secondsString;
			el.loading.circle.setAttribute('stroke-dasharray', progres + ', 100');
		}
		else {
			el.loading.main.style.display = 'none';
			el.loading.text.style.display = 'none';
		}

		//take loot info
		this.takeLootInfo();
		el.takeLoot.textContent = this.takeLootText;
		//items
		el.items.redAmmo.textContent = this.snapshotManager.betweenSnapshot.i.r.toString();
		el.items.greenAmmo.textContent = this.snapshotManager.betweenSnapshot.i.g.toString();
		el.items.blueAmmo.textContent = this.snapshotManager.betweenSnapshot.i.b.toString();
		el.items.orangeAmmo.textContent = this.snapshotManager.betweenSnapshot.i.o.toString();

		el.items.item1in.textContent = this.itemName(this.snapshotManager.betweenSnapshot.i.i1);
		el.items.item2in.textContent = this.itemName(this.snapshotManager.betweenSnapshot.i.i2);
		//ammo color
		this.itemAmmoColor(1, this.snapshotManager.betweenSnapshot.i.i1);
		this.itemAmmoColor(2, this.snapshotManager.betweenSnapshot.i.i2);
		el.items.item3in.textContent = this.itemName(this.snapshotManager.betweenSnapshot.i.i3);
		let item4Text = this.itemName(this.snapshotManager.betweenSnapshot.i.i4);
		const item4Count = this.snapshotManager.betweenSnapshot.i.s4;
		if (item4Text) item4Text += ' ' + item4Count;
		el.items.item4in.textContent = item4Text;

		let item5Text = this.itemName(this.snapshotManager.betweenSnapshot.i.i5);
		const item5Count = this.snapshotManager.betweenSnapshot.i.s5;
		if (item5Text) item5Text += ' ' + item5Count;
		el.items.item5in.textContent = item5Text;

		//active weapon
		this.activeItem(this.snapshotManager.betweenSnapshot.i.i1, el.items.item1);
		this.activeItem(this.snapshotManager.betweenSnapshot.i.i2, el.items.item2);
		this.activeItem(this.snapshotManager.betweenSnapshot.i.i3, el.items.item3);
		this.activeItem(this.snapshotManager.betweenSnapshot.i.i4, el.items.item4);
		this.activeItem(this.snapshotManager.betweenSnapshot.i.i5, el.items.item5);

		//activeGunAmmo
		let ammo = '';
		if (
			this.myPlayer.getWeapon() === Weapon.Pistol ||
			this.myPlayer.getWeapon() === Weapon.Rifle ||
			this.myPlayer.getWeapon() === Weapon.Machinegun ||
			this.myPlayer.getWeapon() === Weapon.Shotgun
		) {
			ammo = betweenSnapshot.i.a.toString();
		}
		else if (this.myPlayer.getWeapon() === Weapon.Hand || this.myPlayer.getWeapon() === Weapon.Hammer) {
			ammo = '∞';
		}
		else if (this.myPlayer.getWeapon() === Weapon.Granade || this.myPlayer.getWeapon() === Weapon.Smoke) {
			ammo = item4Count.toString();
		}
		else if (this.myPlayer.getWeapon() === Weapon.Medkit) {
			ammo = item5Count.toString();
		}
		el.activeGunAmmo.textContent = ammo;

		//alive
		let count = 0;
		for (const player of this.snapshotManager.players) {
			if (player.alive()) count++;
		}
		el.alive.textContent = count.toString();

		//top items
		let display = 'none';
		if (this.snapshotManager.betweenSnapshot.i.s !== 1) display = 'block';
		el.items.scope.style.display = display;
		display = 'none';
		if (this.snapshotManager.betweenSnapshot.i.v) display = 'block';
		el.items.vest.style.display = display;

		//messages
		this.snapshotManager.messageManager();
		el.messages.innerHTML = '';
		for (let i = this.snapshotManager.messages.length - 1; i >= 0; i--) {
			const message = this.snapshotManager.messages[i];
			const element = document.createElement('p');
			element.textContent = message.text;
			el.messages.appendChild(element);
		}
	}

	private createBulletLines(): void {
		for (const bullet of this.snapshotManager.betweenSnapshot.b) {
			let thereIsLine = false;
			//set end in line
			for (const line of this.bulletLines) {
				if (line.id === bullet.id) {
					line.setEnd(bullet.x, bullet.y);
					thereIsLine = true;
					break;
				}
			}
			//create new line
			if (!thereIsLine) this.bulletLines.push(new BulletLine(bullet.id, bullet.x, bullet.y));
		}
		//delete old bullet lines
		for (let i = this.bulletLines.length - 1; i >= 0; i--) {
			if (!this.bulletLines[i].isActive()) {
				this.bulletLines.splice(i, 1);
			}
		}
	}

	private activeItem(item: Weapon, element: HTMLElement): void {
		if (this.myPlayer.getWeapon() === item) {
			element.classList.add('active');
		}
		else {
			element.classList.remove('active');
		}
	}

	private itemAmmoColor(item: number, weapon: Weapon): void {
		let el;
		if (item === 1) {
			el = this.myHtmlElements.items.item1Ammo;
		}
		else if (item === 2) {
			el = this.myHtmlElements.items.item2Ammo;
		}
		let background = 'transparent';
		switch (weapon) {
			case Weapon.Pistol:
				background = 'orange';
				break;
			case Weapon.Machinegun:
				background = 'blue';
				break;
			case Weapon.Rifle:
				background = 'Green';
				break;
			case Weapon.Shotgun:
				background = 'red';
				break;
		}
		if (el) el.style.background = background;
	}

	private itemName(item: any): string {
		let weaponName: string = '';
		if (item === Weapon.Pistol) weaponName = 'Pistol';
		if (item === Weapon.Rifle) weaponName = 'Rifle';
		if (item === Weapon.Machinegun) weaponName = 'Machinegun';
		if (item === Weapon.Shotgun) weaponName = 'Shotgun';
		if (item === Weapon.Granade) weaponName = 'Granade';
		if (item === Weapon.Smoke) weaponName = 'Smoke';
		if (item === Weapon.Hand) weaponName = 'Hands';
		if (item === Weapon.Hammer) weaponName = 'Hammer';
		if (item === Weapon.Medkit) weaponName = 'Medkit';
		return weaponName;
	}

	private takeLootInfo(): void {
		this.takeLootText = '';
		if (!this.snapshotManager.betweenSnapshot) return;
		if (this.snapshotManager.betweenSnapshot.i.l !== 0) return;

		for (const loot of this.snapshotManager.betweenSnapshot.l) {
			const x = this.myPlayer.getCenterX() - (loot.x + loot.size / 2);
			const y = this.myPlayer.getCenterY() - (loot.y + loot.size / 2);
			const distance = Math.sqrt(x * x + y * y);
			const lootAndPlayerRadius = this.snapshotManager.players[0].radius + loot.size / 2;
			if (distance < lootAndPlayerRadius) {
				this.takeLootText = 'Take (E)';
				return;
			}
		}
	}

	private howToDraw(gameObject: RoundObject | RectObject | RectangleObstacle | RoundObstacle): DrawData {
		/*
		this.finalResolutionAdjustment = this.resolutionAdjustment;
		//scope
		if (this.snapshotManager.betweenSnapshot.i.s === 2) this.finalResolutionAdjustment /= 1.2;
		else if (this.snapshotManager.betweenSnapshot.i.s === 4) this.finalResolutionAdjustment /= 1.4;
		else if (this.snapshotManager.betweenSnapshot.i.s === 6) this.finalResolutionAdjustment /= 1.6;
		*/
		//size
		let size = 0;
		let width = 0;
		let height = 0;
		//round or square
		if ((<RoundObject>gameObject).size) {
			size = (<RoundObject>gameObject).size * this.finalResolutionAdjustment;
			width = size;
			height = size;
		}
		else {
			//rect
			width = (<RectObject>gameObject).width * this.finalResolutionAdjustment;
			height = (<RectObject>gameObject).height * this.finalResolutionAdjustment;
		}
		//animate shift
		let animateShiftX = 0;
		let animateShiftY = 0;
		if (gameObject instanceof RoundObstacle) {
			const animateShift = gameObject.animate();
			animateShiftX = animateShift.x;
			animateShiftY = animateShift.y;
		}
		//positions on screen
		const x =
			this.screenCenterX +
			(gameObject.x + animateShiftX - this.myPlayer.getCenterX()) * this.finalResolutionAdjustment;
		const y =
			this.screenCenterY +
			(gameObject.y + animateShiftY - this.myPlayer.getCenterY()) * this.finalResolutionAdjustment;
		//Is is on the screen?
		let isOnScreen = true;
		if (x > this.gameScreen.width || x < -width || y > this.gameScreen.height || y < -height) {
			isOnScreen = false;
		}
		return {
			x,
			y,
			size,
			width,
			height,
			isOnScreen
		};
	}
}
