import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useParams } from "react-router-dom";
import { getAPI } from "../../Services/apis";
import { toast } from "react-toastify";
import moment from "moment";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ParticularUser() {
  const [userData, setUsersData] = React.useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const { id } = useParams();

  React.useEffect(() => {
    getUser(id);
  }, []);

  const getUser = async (id) => {
    try {
      const response = await getAPI(`user/get-user/${id}`);
      if (response.statusCode === 200) {
        setUsersData(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {userData?.firstName && Array.from(userData?.firstName)[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={`${userData?.firstName}  ${userData?.lastName}`}
          subheader={`${moment(userData?.createdAt).format("DD/MM/YYYY")}`}
        />
        <CardMedia
          component="img"
          height="194"
          image={userData?.profileImageUrl}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {userData?.userName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <div>
              latitude : {userData?.location?.coordinates[0]}
              <br />
              longitude : {userData?.location?.coordinates[1]}
            </div>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{userData?.about}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
