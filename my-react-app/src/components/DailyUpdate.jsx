import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, BlobProvider } from '@react-pdf/renderer';
import '../css/DailyUpdate.css'; // Import the CSS file for styling

function DailyUpdate() {
  const [dailyUpdate, setDailyUpdate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8080/daily-update') 
      .then(response => response.json())
      .then(data => {
        console.log(data); // Check the data received from the server
        setDailyUpdate(data.daily_update); // Update state with daily_update content
        setIsLoading(false); // Set loading to false after data is received
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  
  const formatContent = (content) => {
    // Use regular expression to identify lines between **
    const formattedContent = content.replace(/\*\*(.*?)\*\*/g, (_, match) => {
      // Wrap the matched content in <strong> tags
      return `<strong>${match}</strong>`;
    });
    return formattedContent;
  };

  return (
    <div className="daily-update-container">
      {!isLoading && (
        <div className="export-pdf-btn">
          <BlobProvider document={<MyDocument content={dailyUpdate} />}>
            {({ blob, url, loading, error }) => (
              <a href={url} download="daily-update.pdf">
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/ios/50/export-pdf--v1.png"
                  alt="export-pdf--v1"
                  style={{ filter: "brightness(0) saturate(100%) invert(50%) sepia(1) saturate(200%) hue-rotate(180deg)" }}
                />
                <span className="export-pdf-text">Export PDF</span>
              </a>
            )}
          </BlobProvider>
        </div>
      )}
      <h2 className="daily-update-heading">The latest breakthroughs and challenges in cybersecurity</h2>
      <div className="daily-update-content">
        {dailyUpdate ? (
          <div>
            {formatContent(dailyUpdate).split('\n').map((line, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: line }} />
            ))}
          </div>
        ) : (
          <div className="loading-container">
            <h1 className="loading-text">Loading...</h1>
            <div className="loading-icon"></div>
          </div>
        )}
      </div>
    </div>
  );
}

const MyDocument = ({ content }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text>{content}</Text>
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export default DailyUpdate;
