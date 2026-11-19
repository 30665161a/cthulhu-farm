import { EventEmitter } from 'events';

export enum GamePhase {
  DAY = 'DAY',
  NIGHT = 'NIGHT'
}

export interface PlayerState {
  sanity: number;
  gold: number;
  boneCoins: number;
}

export class TimeManager extends EventEmitter {
  private currentPhase: GamePhase = GamePhase.DAY;
  private player: PlayerState;

  constructor(initialPlayerState: PlayerState) {
    super();
    this.player = initialPlayerState;
  }

  public getCurrentPhase(): GamePhase {
    return this.currentPhase;
  }

  public switchPhase(newPhase: GamePhase): void {
    if (this.currentPhase === newPhase) return;
    
    console.log(`[System] Phase switching from ${this.currentPhase} to ${newPhase}...`);
    this.currentPhase = newPhase;
    this.emit('PhaseChanged', newPhase);

    if (newPhase === GamePhase.NIGHT) {
      this.enableEldritchMechanics();
      this.calculateSanityDrain();
    } else {
      this.disableEldritchMechanics();
    }
  }

  private enableEldritchMechanics(): void {
    // TODO: Devin Bot - 生成怪物、开启献祭UI、更改环境光照
    console.log('[Eldritch] 夜晚降临，怪异现象开始发生...');
  }

  private disableEldritchMechanics(): void {
    // TODO: Devin Bot - 清除怪物、重置环境
    console.log('[Normal] 天亮了，农场恢复平静。');
  }

  private calculateSanityDrain(): void {
    // 伪逻辑：假设从玩家背包或者农场网格中统计诡异作物的数量
    const activeEldritchCrops = 3; // 示例数值，实际应由 GridManager 提供
    const drainRate = 1.5;
    
    const totalDrain = activeEldritchCrops * drainRate;
    this.player.sanity = Math.max(0, this.player.sanity - totalDrain);
    
    console.log(`[Sanity] 扣除理智值: ${totalDrain}. 当前SAN值: ${this.player.sanity}`);
    
    if (this.player.sanity <= 20) {
      this.emit('SanityCritical'); // 触发幻听、屏幕扭曲特效
    }
  }
}
