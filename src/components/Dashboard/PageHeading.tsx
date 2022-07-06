import React, { ReactNode } from "react";
import { Box, Breadcrumbs, Stack, Typography } from "@mui/material";
import { MdOutlineNavigateNext } from "react-icons/md";
import styles from "../../assets/jss/components/DashboardLayoutStyles/PageHeadingStyles";

interface IPageHeadingProps {
  heading: string;
  subHeading?: string;
  children?: ReactNode;
  breadcrumbs?: string[] | undefined;
}
export const PageHeading: React.FC<IPageHeadingProps> = ({
  heading,
  subHeading,
  children,
  breadcrumbs,
}) => {
  return (
    <Box sx={styles.root}>
      <Stack flexGrow={1} spacing={1}>
        <Typography variant="h4" sx={styles.heading}>
          {heading}
        </Typography>
        {subHeading !== "" && (
          <Typography color="text.secondary" variant="subtitle1">
            {subHeading}
          </Typography>
        )}
        {breadcrumbs && (
          <Breadcrumbs
            separator={<MdOutlineNavigateNext fontSize={16} />}
            aria-label="breadcrumb"
          >
            {breadcrumbs.map(crumb => (
              <Typography variant="body2" key={crumb} color="text.secondary">
                {crumb}
              </Typography>
            ))}
          </Breadcrumbs>
        )}
      </Stack>

      <Stack direction="row" spacing={1}>
        {children}
      </Stack>
    </Box>
  );
};

PageHeading.defaultProps = {
  children: null,
  subHeading: "",
  breadcrumbs: undefined,
};
