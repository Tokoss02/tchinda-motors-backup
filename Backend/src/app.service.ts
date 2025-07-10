import { Injectable } from '@nestjs/common';
import * as os from 'os';
import * as fs from 'fs';
import * as path from 'path';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService {
  private readonly startTime = Date.now();

  constructor(@InjectConnection() private readonly connection: Connection) { }

  getStatus(): Record<string, any> {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;

    const disk = this.getDiskSpaceInfo();

    return {
      status: 'OK',
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      uptime: `${Math.floor((Date.now() - this.startTime) / 1000)} seconds`,
      host: os.hostname(),
      platform: os.platform(),
      cpu: os.cpus()[0].model,
      memory: {
        total: `${(totalMem / 1024 / 1024).toFixed(2)} MB`,
        used: `${(usedMem / 1024 / 1024).toFixed(2)} MB`,
        free: `${(freeMem / 1024 / 1024).toFixed(2)} MB`,
      },
      disk,
      dbStatus: this.getDbStatus(this.connection.readyState),
    };
  }

  private getDbStatus(state: number): string {
    switch (state) {
      case 0: return 'Disconnected';
      case 1: return 'Connected';
      case 2: return 'Connecting';
      case 3: return 'Disconnecting';
      default: return 'Unknown';
    }
  }

  private getDiskSpaceInfo(): Record<string, any> {
    try {
      const stat = fs.statSync('/');
      const { blocks, blksize } = stat as any;
      if (!blocks || !blksize) throw new Error('Bad stat data');
      return {
        total: `${(blocks * blksize / 1024 / 1024).toFixed(2)} MB`,
        blockSize: blksize,
      };
    } catch (err) {
      return { error: 'Disk info not available' };
    }
  }
}
