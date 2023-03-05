import { Box, Button, IconButton, Typography } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import theme from "../theme";
import styled from "@emotion/styled";
import { ISearchHistoryProps } from "../interfaces/searchHistoryProps";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";

const RecordHistoryBox = styled(Box)({
  borderRadius: 16,
  background: "rgba(26,26,26,0.5)",
  backdropFilter: "blur(20px)",
  padding: theme.spacing(1.5),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing(2),
  transition: "0.3s all",
  "&:last-child": {
    marginBottom: theme.spacing(2),
  },
  "&:hover": {
    background: "rgba(26,26,26,0.9)",
    transform: "scale(1.03)",
  },
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(2),
  },
});

const RecordHistoryBtn = styled(Button)({
  backgroundColor: "transparent",
  borderColor: "#7F7C8E",
  borderWidth: 2,
  borderRadius: "50%",
  borderStyle: "solid",
  color: "#7F7C8E",
  width: 34,
  minWidth: 34,
  height: 34,
  cursor: "pointer",
});

const RecordHistory = ({
  city,
  country,
  time,
  onDelete,
  onSearch,
}: ISearchHistoryProps & { onDelete: () => void } & { onSearch: () => void }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
    setTimeout(() => setShow(false), 1000);
  };

  return (
    <CSSTransition in={show} timeout={1000} classNames="fade">
      <RecordHistoryBox>
        <Box textAlign="left" display={{ md: "flex" }} alignItems="center" justifyContent="space-between" width="100%">
          <Typography fontSize={{ xs: "14px", md: "16px" }}>
            {city}, {country}
          </Typography>
          <Typography fontSize={{ xs: "10px", md: "14px" }} color="rgba(255,255,255,0.5)" marginTop="4px">
            {time}
          </Typography>
        </Box>
        <Box display="flex" gap="8px" marginLeft="16px">
          <RecordHistoryBtn size="medium" onClick={onSearch}>
            <FaSearch size="20" />
          </RecordHistoryBtn>
          <RecordHistoryBtn size="medium" onClick={onDelete}>
            <AiFillDelete size="28" />
          </RecordHistoryBtn>
        </Box>
      </RecordHistoryBox>
    </CSSTransition>
  );
};

export default RecordHistory;
