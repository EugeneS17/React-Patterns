import { Image, Text, Button } from '@mantine/core';
import { Portal } from '../Portal';
import { Launch } from '../../types/launch';
import styles from './index.module.css';
import { useLockScroll } from '../../hooks/useLockScroll';

interface LaunchModalProps {
  launch: Launch;
  onClose: () => void;
}

export const LaunchModal = ({ launch, onClose }: LaunchModalProps) => {
  useLockScroll();

  return (
    <Portal>
      <div className={styles.overlay} onClick={onClose} data-testid="modal-overlay">
        <div className={styles.content} onClick={(e) => e.stopPropagation()}>
          <button className={styles.close} onClick={onClose} aria-label="Close modal">
            ✕
          </button>
          
          <h2 className={styles.title}>{launch.mission_name}</h2>
          
          <div className={styles.imageContainer}>
            <Image
              src={launch.links.mission_patch || 'https://via.placeholder.com/300'}
              alt={launch.mission_name}
              height={250}
              fit="contain"
            />
          </div>

          <div className={styles.info}>
            <div className={styles.infoItem}>
              <Text fw={600} size="sm">Mission name:</Text>
              <Text c="dimmed" size="sm">{launch.mission_name}</Text>
            </div>

            <div className={styles.infoItem}>
              <Text fw={600} size="sm">Rocket name:</Text>
              <Text c="dimmed" size="sm">{launch.rocket.rocket_name}</Text>
            </div>

            <div className={styles.infoItem}>
              <Text fw={600} size="sm">Details:</Text>
              <Text c="dimmed" size="sm">
                {launch.details || 'No details available for this mission.'}
              </Text>
            </div>
          </div>

          <Button 
            color="blue" 
            fullWidth 
            mt="md" 
            radius="md" 
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </Portal>
  );
};

