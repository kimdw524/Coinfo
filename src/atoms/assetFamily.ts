'use client';

import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';

import type { Asset } from '@/types/asset';

export const assetFamily = atomFamily(() => atom<Asset | undefined>());
