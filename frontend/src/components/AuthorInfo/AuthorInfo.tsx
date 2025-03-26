import React, { useEffect, useState } from "react";
import InfoModal from "../InfoModal/InfoModal"; // Reusing the InfoModal component
import { fetchAuthorBio } from "../../services/openLibrary/openLibraryService"; // Import the service
import { Box, Typography, CircularProgress, Avatar } from "@mui/material";
import { AuthorInfoProps } from "../../types/props";

// Local cache for author bios
const authorBioCache: Record<string, { biography: string; imageUrl: string | null }> = {};

const AuthorInfo: React.FC<AuthorInfoProps> = ({ isOpen, onClose, authorName }) => {
  const [biography, setBiography] = useState<string>("Loading...");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (isOpen && authorName) {
        setLoading(true);
        setError(null);

        // Check if the author bio is already cached
        if (authorBioCache[authorName]) {
          const cachedData = authorBioCache[authorName];
          setBiography(cachedData.biography);
          setImageUrl(cachedData.imageUrl);
          setLoading(false);
          return;
        }

        try {
          const data = await fetchAuthorBio(authorName); // Fetch author bio using async/await
          console.log("API Response:", data); // Log the API response for debugging

          // Cache the fetched data
          authorBioCache[authorName] = {
            biography: data.biography || "No biography available.",
            imageUrl: data.image_url || null,
          };

          setBiography(authorBioCache[authorName].biography);
          setImageUrl(authorBioCache[authorName].imageUrl);
        } catch (err) {
          console.error("Error fetching author bio:", err);
          setError("Failed to load author information.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [isOpen, authorName]);

  return (
    <InfoModal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          display: loading ? "flex" : "block", // Flex while loading, block when finished
          alignItems: loading ? "center" : "unset", // Center content while loading
          justifyContent: loading ? "center" : "unset", // Center content while loading
          padding: 2,
        }}
      >
        {/* Loading State */}
        {loading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <CircularProgress />
            <Typography variant="body1" color="text.secondary" sx={{ marginTop: 2 }}>
              Loading biography...
            </Typography>
          </Box>
        ) : (
          <>
            {/* Author Image */}
            <Avatar
              src={imageUrl || "/placeholder.jpg"} // Use placeholder if no image is available
              alt={`${authorName}'s image`}
              sx={{
                width: "140px",
                height: "200px",
                borderRadius: "8px",
                float: "left", // Float the Avatar to the left
                marginRight: 2, // Add spacing between the image and text
              }}
            />

            {/* Author Name */}
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              sx={{ fontWeight: 700 }}
            >
              {authorName}
            </Typography>

            {/* Error or Biography */}
            {error ? (
              <Typography variant="body1" color="error.main">
                {error}
              </Typography>
            ) : (
              <Typography
                id="modal-description"
                variant="body2"
                sx={{
                  textAlign: "justify", // Justify the text for a clean look
                }}
              >
                {biography}
              </Typography>
            )}
          </>
        )}
      </Box>
    </InfoModal>
  );
};

export default AuthorInfo;