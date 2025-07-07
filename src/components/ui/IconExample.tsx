import { FontAwesomeIcon } from '@/lib/fontawesome'

export function IconExample() {
  return (
    <div>
      <h3>Font Awesome Icon Examples:</h3>
      <div style={{ display: 'flex', gap: '1rem', fontSize: '2rem' }}>
        <FontAwesomeIcon icon="play" />
        <FontAwesomeIcon icon="pause" />
        <FontAwesomeIcon icon="stop" />
        <FontAwesomeIcon icon="dumbbell" />
        <FontAwesomeIcon icon="clock" />
        <FontAwesomeIcon icon="cog" spin />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <p>Different sizes:</p>
        <FontAwesomeIcon icon="dumbbell" size="xs" />
        <FontAwesomeIcon icon="dumbbell" size="sm" />
        <FontAwesomeIcon icon="dumbbell" size="lg" />
        <FontAwesomeIcon icon="dumbbell" size="2x" />
      </div>
    </div>
  )
}