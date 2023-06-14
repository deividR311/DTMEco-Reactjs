import Zoom from "@material-ui/core/Zoom";
import Tooltip from "@material-ui/core/Tooltip";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

export const TooltipCustom = ({ title, placement, arrow, style = {} }) => {
  return (
    <>
      <Tooltip
        title={title}
        arrow={arrow}
        style={style}
        placement={placement}
        TransitionComponent={Zoom}
      >
        <div className="infoIcon">
          <InfoOutlinedIcon fontSize="small" />
        </div>
      </Tooltip>
    </>
  );
};

TooltipCustom.defaultProps = {
  arrow: true,
  textTooltip: "",
  placement: "top" || "left" || "right" || "bottom",
};
