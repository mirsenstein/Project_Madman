function factorialize(num) {
  if (num === 0 || num === 1)
    return 1;
  for (var i = num - 1; i >= 1; i--) {
    num *= i;
  }
  return num;
}

// 1 ingr => 1

// all ingr same effect => 0

// # of same effect > # of rest ingr => 0
