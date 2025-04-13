import React, { ReactNode } from "react";
import { ViewStyle } from "react-native";

export type ScreenWrapperProps = {
    children: React.ReactNode;
    style?: ViewStyle;
};