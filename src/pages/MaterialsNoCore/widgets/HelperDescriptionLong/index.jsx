import { Grid } from "@material-ui/core";

export const HelperDescriptionLong = ({ helperDescriptionLong }) => {
  return (
    <section className="sectionLongDescriptionHelpers">
      <div className="sectionLongDescriptionHelpers__container">
        <Grid container spacing={2} className="container__item">
          {helperDescriptionLong.length > 0 &&
            helperDescriptionLong.map((data, index) => (
              <Grid xs={4} className="container__item_text" key={data.codigo}>
                <span>{index + 1}-</span> {data.caracteristica.toLowerCase()}
              </Grid>
            ))}
        </Grid>
      </div>
    </section>
  );
};
