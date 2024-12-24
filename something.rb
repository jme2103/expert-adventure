a,b = 1,1
puts a
puts b
10.times do
  puts a+b
  a,b = b,a+b
end