const chunkText = (text, chunkSize = 300) => {

  const chunks = [];

  for (let i = 0; i < text.length; i += chunkSize) {

    const chunk = text.slice(i, i + chunkSize);

    chunks.push(chunk);

  }

  return chunks;

};

export default chunkText;