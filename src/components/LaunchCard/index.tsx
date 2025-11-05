import { Card, Image, Text, Button, Group } from '@mantine/core';
import { Launch } from '../../types/launch';
import styles from './index.module.css';

interface LaunchCardProps {
  launch: Launch;
  onSeeMore: () => void;
}

export const LaunchCard = ({ launch, onSeeMore }: LaunchCardProps) => {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder className={styles.card}>
      <Card.Section>
        <Image
          src={launch.links.mission_patch_small || 'https://via.placeholder.com/150'}
          height={160}
          alt={launch.mission_name}
          fit="contain"
          className={styles.imageSection}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500} size="lg" className={styles.title}>
          {launch.mission_name}
        </Text>
      </Group>

      <Text size="sm" c="dimmed" className={styles.subtitle}>
        {launch.rocket.rocket_name}
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md" onClick={onSeeMore}>
        See more
      </Button>
    </Card>
  );
};

