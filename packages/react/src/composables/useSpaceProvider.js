import { useContext } from 'react';
import { SpaceContext } from '../providers/SpaceProvider';

export default function useSpaceProvider() {
  return useContext(SpaceContext);
}
