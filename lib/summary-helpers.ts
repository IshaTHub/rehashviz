export const parseSection = (section: string): { title: string; points: string[] } => {
    const [title, ...content] = section.split('\n');
  
    const cleanTitle = title.startsWith("#")
      ? title.substring(1).trim()
      : title.trim();
  
    const points: string[] = [];
    let currentPoint = '';
  
    for (const line of content) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('•') || trimmedLine.startsWith('>') || trimmedLine.startsWith('#')) {
        if (currentPoint) points.push(currentPoint.trim());
        currentPoint = trimmedLine;
      } else if (!trimmedLine) {
        if (currentPoint) points.push(currentPoint.trim());
        currentPoint = '';
      } else {
        currentPoint += ` ${trimmedLine}`;
      }
    }
  
    if (currentPoint) points.push(currentPoint.trim());
  
    const filteredPoints = points.filter(
      (point) => point && !point.startsWith("#") && !point.startsWith("[Choose]")
    );
  
    console.log("Parsed points:", filteredPoints);
  
    return {
      title: cleanTitle,
      points: filteredPoints,
    };
  };