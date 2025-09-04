#!/bin/bash

# This script calculates simple interest given principal, rate, and time.

# Prompt the user for input
echo "Enter the principal amount:"
read principal

echo "Enter the rate of interest (per year):"
read rate

echo "Enter the time period (in years):"
read time

# Calculate simple interest
# We use 'bc -l' for floating-point arithmetic to handle decimal values.
interest=$(echo "$principal * $rate * $time / 100" | bc -l)

# Print the result, formatted to two decimal places
printf "The simple interest is: %.2f\n" $interest
