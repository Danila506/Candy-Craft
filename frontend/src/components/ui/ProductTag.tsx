// Стили для тегов
const tagStyles = {
  display: 'inline-block',
  backgroundColor: '#f0f0f0',
  padding: '4px 12px',
  margin: '4px',
  borderRadius: '20px',
  fontSize: '14px',
};

interface TagsDisplayProps {
  tags: string[];
}

export function ProductTags({ tags }: TagsDisplayProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {tags?.map((tag, index) => (
        <div 
          key={index} 
          style={{
            ...tagStyles,
            backgroundColor: tag === 'новинка' ? '#e3f2fd' : 
                           tag === 'хит' ? '#ffebee' : '#f5f5f5'
          }}
        >
          {tag}
        </div>
      ))}
    </div>
  );
}