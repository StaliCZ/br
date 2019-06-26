import { Keys, Mouse } from './Controller';
import Socket from './Socket';
import View from './View';
import { Player } from './Player';
import Map from './Map';
import WaterTerrainData from './WaterTerrainData';
import Bullet from './Bullet';
import ServerClientSync from './ServerClientSync';
import { Snapshot } from './Snapshot';
import MyHtmlElements from './MyHtmlElements';
import Editor from './Editor';
import CollisionPoints from './CollisionPoints';

export default class Model {
	private game: number = 0;
	private name: string;
	private id: string;
	private view: View;
	private player: Player;
	snapshots: Snapshot[] = [];
	private socket: Socket;
	private waterTerrainData: WaterTerrainData;
	private keys: Keys;
	private mouse: Mouse;
	map: Map;
	private bullets: Bullet[] = [];
	private serverClientSync: ServerClientSync;
	private myHtmlElements: MyHtmlElements;
	private editor: Editor;
	collisionPoints: CollisionPoints;

	constructor(
		keys: Keys,
		mouse: Mouse,
		socket: Socket,
		serverClientSync: ServerClientSync,
		myHtmlElements: MyHtmlElements,
		editor: Editor
	) {
		this.socket = socket;
		this.serverClientSync = serverClientSync;
		this.waterTerrainData = new WaterTerrainData();
		this.map = new Map(this.waterTerrainData);
		this.player = new Player(this.map);
		this.keys = keys;
		this.mouse = mouse;
		this.myHtmlElements = myHtmlElements;
		this.editor = editor;
		this.collisionPoints = new CollisionPoints();
		this.view = new View(
			this.map,
			this.player,
			this.snapshots,
			this.bullets,
			this.mouse,
			this.waterTerrainData,
			this.serverClientSync,
			this.myHtmlElements,
			this.collisionPoints
		);
		setTimeout(() => {
			this.gameLoop();
		}, 200);
	}

	setID(id: string): void {
		this.id = id;
	}

	setName(name: string): void {
		this.name = name;
	}

	getID(): string {
		return this.id;
	}

	getName(): string {
		return this.name;
	}

	getGame(): number {
		return this.game;
	}

	private gameLoop(): void {
		//repeat
		requestAnimationFrame(() => {
			this.gameLoop();
		});

		//sync
		if (!this.serverClientSync.ready()) {
			this.socket.emit('serverClientSync', Date.now());
		}

		/*
		this.player.playerMove(this.keys.w, this.keys.a, this.keys.s, this.keys.d, this.mouse.x, this.mouse.y);

		//move and delete bullets
		for (let i = this.bullets.length - 1; i >= 0; i--) {
			const bullet = this.bullets[i];
			if (bullet.flying()) {
				bullet.move(this.map);
			}
			else {
				this.bullets.splice(i, 1);
			}
		}
		//hit
		if (this.mouse.left) {
			this.player.hit();
			if (this.player.gun.ready()) {
				this.bullets.push(
					new Bullet(
						this.player.getCenterX(),
						this.player.getCenterY(),
						this.player.getAngle(),
						this.player.gun.range
					)
				);
			}
			this.mouse.left = false;
		}
		*/
		if (this.editor.isActive()) {
			this.view.drawEditor(this.editor);
		}
		this.view.draw();
	}

	screenResize(): void {
		this.view.screenResize();
	}
}
